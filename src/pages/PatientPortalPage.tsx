import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../lib/database";
import { Menu } from "lucide-react";
import { ToastProvider } from "../contexts/ToastContext";
import { QuickActionButton } from "../components/patient-portal/QuickActionButton";

// Import modular components
import { PortalSidebar } from "../components/patient-portal/PortalSidebar";
import { DashboardStats } from "../components/patient-portal/DashboardStats";
import { AppointmentsView } from "../components/patient-portal/AppointmentsView";
import { MedicalRecordsView } from "../components/patient-portal/MedicalRecordsView";
import { PrescriptionsView } from "../components/patient-portal/PrescriptionsView";
import { LoginSignupView } from "../components/patient-portal/LoginSignupView";
import { HealthReminders } from "../components/patient-portal/HealthReminders";
import { AppointmentCalendar } from "../components/patient-portal/AppointmentCalendar";
import { EnhancedAppointmentsTable } from "../components/patient-portal/EnhancedAppointmentsTable";

interface PatientPortalPageProps {
  onNavigate: (page: string) => void;
  initialView?: "login" | "signup";
}

interface Appointment {
  id: string;
  patient_name: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  doctor_name?: string;
  specialization?: string;
  type?: string;
  notes?: string;
}

export function PatientPortalPage({
  onNavigate,
  initialView = "login",
}: PatientPortalPageProps) {
  const { t } = useLanguage();
  const { user, signIn, signUp, signOut } = useAuth();

  // View state
  const [view, setView] = useState<"login" | "signup" | "dashboard">(
    initialView
  );

  // Active tab for dashboard
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mobile sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Data state
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Form states
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    error: "",
  });

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    error: "",
  });

  // Effects
  useEffect(() => {
    // Check if user is logged in
    if (user) {
      setView("dashboard");
      loadAppointments();
    } else {
      // Use the initialView prop if provided, otherwise check URL hash
      const shouldShowSignup = window.location.hash === "#signup";
      setView(shouldShowSignup ? "signup" : initialView);
    }
  }, [user, onNavigate, initialView]);

  // Data functions
  const loadAppointments = () => {
    const userAppointments = db.getAllAppointments();
    setAppointments(userAppointments);
  };

  // Event handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginData({ ...loginData, error: "" });

    try {
      await signIn(loginData.email, loginData.password);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setLoginData({
        ...loginData,
        error: t(
          errorMessage || "Invalid email or password. Please try again.",
          "ইমেইল বা পাসওয়ার্ড ভুল। আবার চেষ্টা করুন।"
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSignupData({ ...signupData, error: "" });

    // Validation
    if (!signupData.fullName.trim()) {
      setSignupData({
        ...signupData,
        error: t("Full name is required", "পুরো নাম প্রয়োজন"),
      });
      setLoading(false);
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(signupData.email)) {
      setSignupData({
        ...signupData,
        error: t("Please enter a valid email", "সঠিক ইমেইল ঠিকানা দিন"),
      });
      setLoading(false);
      return;
    }

    if (signupData.password.length < 6) {
      setSignupData({
        ...signupData,
        error: t(
          "Password must be at least 6 characters",
          "পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে"
        ),
      });
      setLoading(false);
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      setSignupData({
        ...signupData,
        error: t("Passwords do not match", "পাসওয়ার্ড মিলছে না"),
      });
      setLoading(false);
      return;
    }

    try {
      await signUp(
        signupData.email,
        signupData.password,
        signupData.fullName,
        signupData.phone
      );

      // Clear form after successful signup
      setSignupData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        error: "",
      });

      // Show success message and switch to login view
      setView("login");
      setLoginData({
        email: signupData.email,
        password: "",
        error: t(
          "Account created successfully! Please sign in.",
          "অ্যাকাউন্ট তৈরি হয়েছে! দয়া করে সাইন ইন করুন।"
        ),
      });
    } catch (error) {
      console.error("Signup error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setSignupData({
        ...signupData,
        error: t(
          errorMessage || "Failed to create account. Please try again.",
          "অ্যাকাউন্ট তৈরি ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    setView("login");
  };

  // Render Dashboard View with new sidebar layout
  if (view === "dashboard" && user) {
    return (
      <ToastProvider>
        <div className="flex min-h-screen bg-gray-50">
          {/* Sidebar */}
          <PortalSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            user={user}
            t={t}
            handleLogout={handleLogout}
            onNavigate={onNavigate}
            isOpen={sidebarOpen}
            setIsOpen={setSidebarOpen}
          />

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            {/* Mobile header */}
            <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-20">
              <h1 className="text-lg font-semibold text-gray-900">
                DentistBari
              </h1>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {/* Content area */}
            <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto space-y-6">
              {/* Dashboard - with stats, calendar, and reminders */}
              {activeTab === "dashboard" && (
                <>
                  {/* Welcome Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-lg">
                    <h1 className="text-3xl font-bold mb-2">
                      {t("Welcome back", "স্বাগতম")} {user.fullName}! 👋
                    </h1>
                    <p className="text-blue-100">
                      {t(
                        "Here's a summary of your dental health journey",
                        "আপনার দাঁতের স্বাস্থ্য যাত্রার সারসংক্ষেপ এখানে রয়েছে"
                      )}
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <DashboardStats t={t} />

                  {/* Calendar and Reminders Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <AppointmentCalendar t={t} />
                    </div>
                    <div>
                      <HealthReminders t={t} />
                    </div>
                  </div>
                </>
              )}

              {/* Appointments Tab */}
              {activeTab === "appointments" && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {t("Your Appointments", "আপনার অ্যাপয়েন্টমেন্টসমূহ")}
                    </h1>
                    <p className="text-gray-600">
                      {t(
                        "Manage and view all your dental appointments",
                        "আপনার সকল দন্ত চিকিৎসা অ্যাপয়েন্টমেন্ট পরিচালনা করুন"
                      )}
                    </p>
                  </div>
                  {appointments.length > 0 ? (
                    <EnhancedAppointmentsTable
                      appointments={appointments}
                      t={t}
                    />
                  ) : (
                    <AppointmentsView
                      t={t}
                      onNavigate={onNavigate}
                      appointments={appointments}
                    />
                  )}
                </div>
              )}

              {/* Medical Records Tab */}
              {activeTab === "medical-records" && (
                <div>
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {t("Medical Records", "মেডিকেল রেকর্ড")}
                    </h1>
                    <p className="text-gray-600">
                      {t(
                        "Access your complete dental history",
                        "আপনার সম্পূর্ণ দাঁতের ইতিহাস অ্যাক্সেস করুন"
                      )}
                    </p>
                  </div>
                  <MedicalRecordsView t={t} />
                </div>
              )}

              {/* Prescriptions Tab */}
              {activeTab === "prescriptions" && (
                <div>
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {t("Prescriptions", "প্রেসক্রিপশন")}
                    </h1>
                    <p className="text-gray-600">
                      {t(
                        "View and manage your medications",
                        "আপনার ওষুধ পরিচালনা করুন"
                      )}
                    </p>
                  </div>
                  <PrescriptionsView t={t} />
                </div>
              )}
            </div>
          </div>
        </div>
        <QuickActionButton onClick={() => onNavigate("book-appointment")} />
      </ToastProvider>
    );
  }

  // Render Login/Signup View
  return (
    <LoginSignupView
      t={t}
      view={view === "dashboard" ? "login" : view}
      setView={setView}
      onNavigate={onNavigate}
      loginData={loginData}
      setLoginData={setLoginData}
      signupData={signupData}
      setSignupData={setSignupData}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      loading={loading}
      handleLogin={handleLogin}
      handleSignup={handleSignup}
    />
  );
}
