import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle,
  ChevronDown,
  Activity,
  AlertCircle,
  Stethoscope,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

// Import modular components
import { LoadingState } from "../components/appointment-booking/LoadingState";
import { SuccessState } from "../components/appointment-booking/SuccessState";
import { BookingHeader } from "../components/appointment-booking/BookingHeader";
import { WhatToExpect } from "../components/appointment-booking/WhatToExpect";
import { AppointmentForm } from "../components/appointment-booking/AppointmentForm";

interface BookAppointmentPageProps {
  onNavigate: (page: string) => void;
}

export function BookAppointmentPage({ onNavigate }: BookAppointmentPageProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    appointmentDate: "",
    appointmentTime: "",
    notes: "",
  });

  // Time slots in 24-hour format
  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  // Check authentication and pre-fill user data
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        patientName: user.fullName || "",
        patientEmail: user.email || "",
        patientPhone: user.phone || "",
      }));
    } else {
      onNavigate("login");
    }
    setAuthChecked(true);
  }, [user, onNavigate]);

  // Extract service slug from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceSlug = urlParams.get("service");
    if (serviceSlug) {
      setSelectedService(serviceSlug);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!user) {
      onNavigate("login");
      return;
    }

    // Basic validation
    if (
      !formData.patientName.trim() ||
      !formData.patientEmail.trim() ||
      !formData.patientPhone.trim() ||
      !formData.appointmentDate ||
      !formData.appointmentTime
    ) {
      setFormError(
        t(
          "Please fill in all required fields",
          "অনুগ্রহীয় সমস্ত ক্ষেত্রগুলি পূরণ করুন"
        )
      );
      return;
    }

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formData.patientEmail)) {
      setFormError(
        t("Please enter a valid email address", "অনুগ্রহীয় ইমেল ঠিকানা লিখুন")
      );
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("appointments").insert({
        patient_id: user.id,
        patient_name: formData.patientName,
        patient_email: formData.patientEmail,
        patient_phone: formData.patientPhone,
        appointment_date: formData.appointmentDate,
        appointment_time: formData.appointmentTime,
        notes: formData.notes,
        service_slug: selectedService,
        status: "pending",
      });

      if (error) throw error;
      setSubmitted(true);
    } catch (error) {
      console.error("Appointment booking error:", error);
      setFormError(
        t(
          "Failed to book appointment. Please try again.",
          "অ্যাপয়েন্টমেন্ট বুক করতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"
        )
      );
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking auth
  if (!authChecked) {
    return <LoadingState t={t} />;
  }

  if (submitted) {
    return <SuccessState t={t} onNavigate={onNavigate} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-slate-900/40"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BookingHeader t={t} selectedService={selectedService} />

        <div className="grid lg:grid-cols-3 gap-8">
          <WhatToExpect t={t} />

          <AppointmentForm
            formData={formData}
            setFormData={setFormData}
            formError={formError}
            loading={loading}
            timeSlots={timeSlots}
            onSubmit={handleSubmit}
            t={t}
          />
        </div>
      </div>
    </div>
  );
}
