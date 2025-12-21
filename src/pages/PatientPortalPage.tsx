import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../lib/database";

// Import modular components
import { DashboardHeader } from "../components/patient-portal/DashboardHeader";
import { DashboardStats } from "../components/patient-portal/DashboardStats";
import { AppointmentsView } from "../components/patient-portal/AppointmentsView";
import { MedicalRecordsView } from "../components/patient-portal/MedicalRecordsView";
import { PrescriptionsView } from "../components/patient-portal/PrescriptionsView";
import { LoginSignupView } from "../components/patient-portal/LoginSignupView";

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

  // Render Dashboard View
  if (view === "dashboard" && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-25 to-gray-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Section */}
          <DashboardHeader
            user={user}
            t={t}
            handleLogout={handleLogout}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Main Content */}
          {activeTab === "dashboard" && <DashboardStats t={t} />}

          {activeTab === "appointments" && (
            <AppointmentsView
              t={t}
              onNavigate={onNavigate}
              appointments={appointments}
            />
          )}

          {activeTab === "medical-records" && <MedicalRecordsView t={t} />}

          {activeTab === "prescriptions" && <PrescriptionsView t={t} />}
        </div>
      </div>
    );
  }

  // Render Login/Signup View
  return (
    <LoginSignupView
      t={t}
      view={view}
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
