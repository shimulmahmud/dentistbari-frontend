import { useState, useEffect } from "react";
import { Calendar, LogOut, Eye, EyeOff, Plus } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../lib/database";

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
}

// Dashboard Header Component
const DashboardHeader = ({
  user,
  t,
  handleLogout,
}: {
  user: any;
  t: (key: string, fallback?: string) => string;
  handleLogout: () => void;
}) => (
  <header className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden">
    <div className="px-8 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-1.5 bg-blue-600 rounded-full"></div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                {t("Patient Portal", "রোগী পোর্টাল")}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {t("Welcome back", "স্বাগতম")},{" "}
                <span className="font-medium text-gray-800 ml-1">
                  {user.fullName}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:block h-8 w-px bg-gray-200"></div>
          <button
            onClick={handleLogout}
            className="group flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <LogOut className="h-4 w-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
              {t("Logout", "লগআউট")}
            </span>
          </button>
        </div>
      </div>
    </div>

    {/* Stats Bar */}
    <div className="border-t border-gray-100 bg-gray-50 px-8 py-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {t("Patient", "রোগী")}
          </span>
        </div>
      </div>
    </div>
  </header>
);

// Empty Appointments State Component
const EmptyAppointmentsState = ({
  t,
  onNavigate,
}: {
  t: (key: string, fallback?: string) => string;
  onNavigate: (page: string) => void;
}) => (
  <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900">
      {t("No appointments yet", "এখনো কোন অ্যাপয়েন্টমেন্ট নেই")}
    </h3>
    <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
      {t(
        "You don't have any upcoming appointments. Book your first appointment to get started.",
        "আপনার কোন আসন্ন অ্যাপয়েন্টমেন্ট নেই। শুরু করতে এখনই একটি অ্যাপয়েন্টমেন্ট বুক করুন।"
      )}
    </p>
    <div className="mt-6">
      <button
        onClick={() => onNavigate("book-appointment")}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Plus className="h-4 w-4 mr-2" />
        {t("Book Appointment", "অ্যাপয়েন্টমেন্ট বুক করুন")}
      </button>
    </div>
  </div>
);

// Appointments Table Component
const AppointmentsTable = ({
  appointments,
  t,
}: {
  appointments: Appointment[];
  t: (key: string, fallback?: string) => string;
}) => (
  <div className="overflow-hidden border border-gray-200 rounded-lg">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {t("Date & Time", "তারিখ ও সময়")}
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {t("Doctor", "ডাক্তার")}
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {t("Status", "স্ট্যাটাস")}
          </th>
          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {appointments.map((appointment) => (
          <tr key={appointment.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">
                {new Date(appointment.appointment_date).toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-500">
                {appointment.appointment_time}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">
                {appointment.doctor_name}
              </div>
              <div className="text-sm text-gray-500">
                {appointment.specialty}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  appointment.status === "confirmed"
                    ? "bg-green-100 text-green-800"
                    : appointment.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {appointment.status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button className="text-blue-600 hover:text-blue-900 mr-4">
                {t("View", "দেখুন")}
              </button>
              <button className="text-red-600 hover:text-red-900">
                {t("Cancel", "বাতিল")}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Login Form Component
const LoginForm = ({
  t,
  loginData,
  setLoginData,
  showPassword,
  setShowPassword,
  loading,
  handleLogin,
  onNavigate,
  setView,
}: {
  t: (key: string, fallback?: string) => string;
  loginData: any;
  setLoginData: React.Dispatch<React.SetStateAction<any>>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  handleLogin: (e: React.FormEvent) => Promise<void>;
  onNavigate: (page: string) => void;
  setView: React.Dispatch<
    React.SetStateAction<"login" | "signup" | "dashboard">
  >;
}) => (
  <form onSubmit={handleLogin} className="space-y-6">
    <div>
      <label
        htmlFor="login-email"
        className="block text-sm font-medium text-gray-700 mb-1.5"
      >
        {t("Email Address", "ইমেইল ঠিকানা")}
      </label>
      <div className="relative">
        <input
          id="login-email"
          type="email"
          required
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
          className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          placeholder={t("your@email.com", "আপনার ইমেইল")}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        </div>
      </div>
    </div>
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">
          {t("Password", "পাসওয়ার্ড")}
        </label>
        <button
          type="button"
          onClick={() => onNavigate("forgot-password")}
          className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
        >
          {t("Forgot password?", "পাসওয়ার্ড ভুলে গেছেন?")}
        </button>
      </div>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          required
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 pr-12"
          placeholder="••••••••"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
    <div className="pt-2">
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3.5 px-4 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {t("Signing in...", "সাইন ইন করা হচ্ছে...")}
          </>
        ) : (
          t("Sign In", "সাইন ইন")
        )}
      </button>
    </div>
    <div className="mt-6 text-center text-sm">
      <p className="text-gray-600">
        {t("Don't have an account?", "অ্যাকাউন্ট নেই?")}{" "}
        <button
          type="button"
          onClick={() => setView("signup")}
          className="font-medium text-blue-600 hover:text-blue-500 transition-colors focus:outline-none focus:underline"
        >
          {t("Create one", "একটি তৈরি করুন")}
        </button>
      </p>
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              {t("Or continue with", "অথবা")}
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div>
            <a
              href="#"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Sign in with Google</span>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.88-1.757-4.34-2.797-6.735-2.797-5.522 0-10 4.479-10 10s4.478 10 10 10c8.396 0 10-7.524 10-9.1 0-0.884-0.095-1.54-0.2-2.2h-9.8z" />
              </svg>
            </a>
          </div>

          <div>
            <a
              href="#"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Sign in with Facebook</span>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.563V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </form>
);

// Signup Form Component
const SignupForm = ({
  t,
  signupData,
  setSignupData,
  showPassword,
  setShowPassword,
  loading,
  handleSignup,
  onNavigate,
  setView,
}: {
  t: (key: string, fallback?: string) => string;
  signupData: any;
  setSignupData: React.Dispatch<React.SetStateAction<any>>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  handleSignup: (e: React.FormEvent) => Promise<void>;
  onNavigate: (page: string) => void;
  setView: React.Dispatch<
    React.SetStateAction<"login" | "signup" | "dashboard">
  >;
}) => (
  <form onSubmit={handleSignup} className="space-y-5">
    <div className="space-y-1">
      <label
        htmlFor="signup-fullName"
        className="block text-sm font-medium text-gray-700 mb-1.5"
      >
        {t("Full Name", "পুরো নাম")}
      </label>
      <input
        id="signup-fullName"
        type="text"
        required
        value={signupData.fullName}
        onChange={(e) =>
          setSignupData({ ...signupData, fullName: e.target.value })
        }
        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        placeholder={t("John Doe", "আপনার পুরো নাম")}
      />
    </div>

    <div className="space-y-1">
      <label
        htmlFor="signup-email"
        className="block text-sm font-medium text-gray-700 mb-1.5"
      >
        {t("Email Address", "ইমেইল ঠিকানা")}
      </label>
      <div className="relative">
        <input
          id="signup-email"
          type="email"
          required
          value={signupData.email}
          onChange={(e) =>
            setSignupData({ ...signupData, email: e.target.value })
          }
          className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          placeholder={t("your@email.com", "আপনার ইমেইল")}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        </div>
      </div>
    </div>

    <div className="space-y-1">
      <label
        htmlFor="signup-phone"
        className="block text-sm font-medium text-gray-700 mb-1.5"
      >
        {t("Phone Number", "ফোন নাম্বার")}
      </label>
      <input
        id="signup-phone"
        type="tel"
        required
        value={signupData.phone}
        onChange={(e) =>
          setSignupData({ ...signupData, phone: e.target.value })
        }
        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        placeholder={t("+8801XXXXXXXXX", "০১৭XXXXXXXX")}
      />
    </div>

    <div className="space-y-1">
      <div className="flex items-center justify-between mb-1.5">
        <label
          htmlFor="signup-password"
          className="block text-sm font-medium text-gray-700"
        >
          {t("Password", "পাসওয়ার্ড")}
        </label>
        <button
          type="button"
          onClick={() => onNavigate("forgot-password")}
          className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
        >
          {t("Forgot password?", "পাসওয়ার্ড ভুলে গেছেন?")}
        </button>
      </div>
      <div className="relative">
        <input
          id="signup-password"
          type={showPassword ? "text" : "password"}
          required
          value={signupData.password}
          onChange={(e) =>
            setSignupData({ ...signupData, password: e.target.value })
          }
          className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 pr-12"
          placeholder="••••••••"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        {t("Minimum 6 characters", "ন্যূনতম ৬ অক্ষর")}
      </p>
    </div>

    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        {t("Confirm Password", "পাসওয়ার্ড নিশ্চিত করুন")}
      </label>
      <input
        type={showPassword ? "text" : "password"}
        required
        value={signupData.confirmPassword}
        onChange={(e) =>
          setSignupData({
            ...signupData,
            confirmPassword: e.target.value,
          })
        }
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="••••••••"
      />
    </div>

    <button
      type="submit"
      disabled={loading}
      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center space-x-2"
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {t("Creating Account...", "অ্যাকাউন্ট তৈরি করা হচ্ছে...")}
        </>
      ) : (
        t("Create Account", "অ্যাকাউন্ট তৈরি করুন")
      )}
    </button>

    <div className="text-center text-sm text-gray-600 pt-2">
      {t("Already have an account?", "ইতিমধ্যে একটি অ্যাকাউন্ট আছে?")}{" "}
      <button
        type="button"
        onClick={() => setView("login")}
        className="text-blue-600 hover:text-blue-800 font-medium"
      >
        {t("Sign in", "সাইন ইন করুন")}
      </button>
    </div>
  </form>
);

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

  const toggleView = (newView: "login" | "signup") => {
    setView(newView);
    // Clear any previous errors
    setLoginData({ ...loginData, error: "" });
    setSignupData({ ...signupData, error: "" });
  };

  // Render Dashboard View
  if (view === "dashboard" && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-25 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <DashboardHeader user={user} t={t} handleLogout={handleLogout} />

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {t("Your Appointments", "আপনার অ্যাপয়েন্টমেন্টসমূহ")}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {t(
                      "View and manage your appointments",
                      "আপনার অ্যাপয়েন্টমেন্ট দেখুন এবং পরিচালনা করুন"
                    )}
                  </p>
                </div>
                <button
                  onClick={() => onNavigate("book-appointment")}
                  className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {t("New Appointment", "নতুন অ্যাপয়েন্টমেন্ট")}
                </button>
              </div>
            </div>

            <div className="px-6 sm:px-8 pb-8">
              {appointments.length === 0 ? (
                <EmptyAppointmentsState t={t} onNavigate={onNavigate} />
              ) : (
                <AppointmentsTable appointments={appointments} t={t} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Login/Signup View
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <button
            onClick={() => onNavigate("home")}
            className="group inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1.5 transition-transform duration-200 transform group-hover:-translate-x-0.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            {t("Back to Home", "হোমে ফিরে যান")}
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Tabs */}
          <div className="flex">
            <button
              onClick={() => toggleView("login")}
              className={`flex-1 py-4 px-6 text-center text-sm font-medium transition-all duration-200 relative ${
                view === "login"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {t("Sign In", "সাইন ইন")}
              {view === "login" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
            <button
              onClick={() => toggleView("signup")}
              className={`flex-1 py-4 px-6 text-center text-sm font-medium transition-all duration-200 relative ${
                view === "signup"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {t("Create Account", "নতুন অ্যাকাউন্ট")}
              {view === "signup" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
          </div>

          <div className="p-6">
            {view === "login" ? (
              <LoginForm
                t={t}
                loginData={loginData}
                setLoginData={setLoginData}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                loading={loading}
                handleLogin={handleLogin}
                onNavigate={onNavigate}
                setView={setView}
              />
            ) : (
              <SignupForm
                t={t}
                signupData={signupData}
                setSignupData={setSignupData}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                loading={loading}
                handleSignup={handleSignup}
                onNavigate={onNavigate}
                setView={setView}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
