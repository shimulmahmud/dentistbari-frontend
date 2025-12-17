import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      onNavigate("login");
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
        status: "pending",
      });

      if (error) throw error;
      setSubmitted(true);
    } catch (error) {
      alert(
        t("Failed to book appointment", "অ্যাপয়েন্টমেন্ট বুক করতে ব্যর্থ")
      );
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking auth
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>{t("Loading...", "লোড হচ্ছে...")}</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t("Appointment Requested!", "অ্যাপয়েন্টমেন্ট অনুরোধ করা হয়েছে!")}
          </h2>
          <p className="text-gray-600 mb-8">
            {t(
              "We will confirm your appointment shortly",
              "আমরা শীঘ্রই আপনার অ্যাপয়েন্টমেন্ট নিশ্চিত করব"
            )}
          </p>
          <button
            onClick={() => onNavigate("home")}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition font-semibold"
          >
            {t("Return to Home", "হোমে ফিরে যান")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t("Book Your Appointment", "আপনার অ্যাপয়েন্টমেন্ট বুক করুন")}
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline h-4 w-4 mr-1" />
                {t("Full Name", "পুরো নাম")}
              </label>
              <input
                type="text"
                required
                value={formData.patientName}
                onChange={(e) =>
                  setFormData({ ...formData, patientName: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="inline h-4 w-4 mr-1" />
                {t("Email", "ইমেইল")}
              </label>
              <input
                type="email"
                required
                value={formData.patientEmail}
                onChange={(e) =>
                  setFormData({ ...formData, patientEmail: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="inline h-4 w-4 mr-1" />
                {t("Phone", "ফোন")}
              </label>
              <input
                type="tel"
                required
                value={formData.patientPhone}
                onChange={(e) =>
                  setFormData({ ...formData, patientPhone: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                {t("Date", "তারিখ")}
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                value={formData.appointmentDate}
                onChange={(e) =>
                  setFormData({ ...formData, appointmentDate: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline h-4 w-4 mr-1" />
                {t("Time", "সময়")}
              </label>

              {/* Custom Dropdown for Time Selection */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setTimeDropdownOpen(!timeDropdownOpen)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white text-left flex items-center justify-between hover:border-gray-400"
                >
                  <span
                    className={
                      formData.appointmentTime
                        ? "text-gray-900"
                        : "text-gray-500"
                    }
                  >
                    {formData.appointmentTime ||
                      t("Select time", "সময় নির্বাচন")}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform ${
                      timeDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {timeDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, appointmentTime: time });
                          setTimeDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center justify-between ${
                          formData.appointmentTime === time
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-900"
                        }`}
                      >
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          {time}
                        </span>
                        {formData.appointmentTime === time && (
                          <svg
                            className="h-5 w-5 text-blue-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("Notes", "নোট")}
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder={t(
                  "Any additional information...",
                  "যেকোনো অতিরিক্ত তথ্য..."
                )}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !formData.appointmentTime}
              className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white py-3 rounded-lg hover:from-blue-700 hover:to-teal-600 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading
                ? t("Booking...", "বুক করা হচ্ছে...")
                : t("Book Appointment", "অ্যাপয়েন্টমেন্ট বুক")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
