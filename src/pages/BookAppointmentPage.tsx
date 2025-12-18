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
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-slate-900/40"></div>
        <div className="relative text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-white">{t("Loading...", "লোড হচ্ছে...")}</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center py-12">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-slate-900/40"></div>
        <div className="relative max-w-md mx-auto px-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center border border-white/20">
            <div className="bg-teal-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-teal-500/30">
              <CheckCircle className="h-12 w-12 text-teal-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              {t(
                "Appointment Requested!",
                "অ্যাপয়েন্টমেন্ট অনুরোধ করা হয়েছে!"
              )}
            </h2>
            <p className="text-gray-300 mb-8">
              {t(
                "We will confirm your appointment shortly",
                "আমরা শীঘ্রই আপনার অ্যাপয়েন্টমেন্ট নিশ্চিত করব"
              )}
            </p>
            <button
              onClick={() => onNavigate("home")}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {t("Return to Home", "হোমে ফিরে যান")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-slate-900/40"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-4 py-2 bg-teal-500/20 border border-teal-500/30 rounded-full text-sm font-medium text-teal-200 backdrop-blur-sm mb-6">
            <Activity className="h-4 w-4 mr-2" />
            {t("Book Your Appointment", "আপনার অ্যাপয়েন্টমেন্ট বুক করুন")}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("Schedule Your Visit", "আপনার সফর নির্ধারণ করুন")}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t(
              "Take the first step towards a healthier smile",
              "একটি স্বাস্থ্যকর হাসির প্রথম পদক্ষেপ নিন"
            )}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* What to Expect */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Stethoscope className="h-5 w-5 mr-2 text-teal-400" />
                {t("What to Expect", "কী আশা করবেন")}
              </h2>

              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-teal-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    {t(
                      "Comprehensive dental examination",
                      "ব্যাপক দন্ত পরীক্ষণ"
                    )}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-teal-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    {t(
                      "Personalized treatment plan",
                      "ব্যক্তিগতকৃত চিকিৎসা পরিকল্পনা"
                    )}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-teal-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    {t(
                      "Comfortable and modern facility",
                      "আরামদায়ক এবং আধুনিক সুবিধা"
                    )}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-teal-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    {t(
                      "Transparent pricing and options",
                      "স্বচ্ছ মূল্য এবং বিকল্প"
                    )}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-teal-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    {t("Follow-up care and support", "অনুসরণ যত্ন এবং সমর্থন")}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Appointment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">
                {t("Appointment Details", "অ্যাপয়েন্টমেন্টের বিবরণ")}
              </h2>

              {formError && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-200">{formError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                      <User className="inline h-4 w-4 mr-2 text-teal-400" />
                      {t("Full Name", "পুরো নাম")}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.patientName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          patientName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                      <Mail className="inline h-4 w-4 mr-2 text-teal-400" />
                      {t("Email", "ইমেল")}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.patientEmail}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          patientEmail: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                    <Phone className="inline h-4 w-4 mr-2 text-teal-400" />
                    {t("Phone", "ফোন")}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.patientPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, patientPhone: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                      <Calendar className="inline h-4 w-4 mr-2 text-teal-400" />
                      {t("Date", "তারিখ")}
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.appointmentDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          appointmentDate: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                      <Clock className="inline h-4 w-4 mr-2 text-teal-400" />
                      {t("Time", "সময়")}
                    </label>

                    {/* Custom Dropdown for Time Selection */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setTimeDropdownOpen(!timeDropdownOpen)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-left flex items-center justify-between hover:border-white/40"
                      >
                        <span
                          className={
                            formData.appointmentTime
                              ? "text-white"
                              : "text-gray-400"
                          }
                        >
                          {formData.appointmentTime ||
                            t("Select time", "সময় নির্বাচন করুন")}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 text-gray-400 transition-transform ${
                            timeDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {timeDropdownOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-white/20 rounded-lg shadow-xl max-h-60 overflow-auto">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  appointmentTime: time,
                                });
                                setTimeDropdownOpen(false);
                              }}
                              className={`w-full px-4 py-3 text-left hover:bg-white/10 transition-colors flex items-center justify-between ${
                                formData.appointmentTime === time
                                  ? "bg-teal-600/20 text-teal-400"
                                  : "text-white"
                              }`}
                            >
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                                {time}
                              </span>
                              {formData.appointmentTime === time && (
                                <svg
                                  className="h-5 w-5 text-teal-400"
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
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t("Notes", "নোট")}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-white placeholder-gray-400 resize-none"
                    placeholder={t(
                      "Any additional information...",
                      "যেকোনো অতিরিক্ত তথ্য..."
                    )}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !formData.appointmentTime}
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  {loading
                    ? t("Booking...", "বুক করা হচ্ছে...")
                    : t("Book Appointment", "অ্যাপয়েন্টমেন্ট বুক করুন")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
