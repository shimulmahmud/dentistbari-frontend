import { useState, useEffect } from "react";
import {
  Calendar,
  Eye,
  EyeOff,
  Plus,
  LayoutDashboard,
  FileText,
  Pill,
  Bell,
  Search,
  LogOut,
  User,
  Settings,
} from "lucide-react";
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
  doctor_name?: string;
  specialization?: string;
  type?: string;
  notes?: string;
}

// Dashboard Header Component
const DashboardHeader = ({
  user,
  t,
  handleLogout,
  activeTab,
  setActiveTab,
}: {
  user: any;
  t: (key: string, fallback?: string) => string;
  handleLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  const tabs = [
    {
      id: "dashboard",
      label: t("Dashboard", "ড্যাশবোর্ড"),
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      id: "appointments",
      label: t("Appointments", "অ্যাপয়েন্টমেন্ট"),
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: "medical-records",
      label: t("Medical Records", "মেডিকেল রেকর্ড"),
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: "prescriptions",
      label: t("Prescriptions", "প্রেসক্রিপশন"),
      icon: <Pill className="h-4 w-4" />,
    },
  ];

  const getTabClass = (tabId: string) =>
    `px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 flex items-center space-x-2 ${
      activeTab === tabId
        ? "bg-blue-50 text-blue-700 shadow-sm"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    }`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Top Bar */}
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-1.5 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {t("Patient Portal", "রোগী পোর্টাল")}
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-full focus:outline-none transition-colors duration-200"
              aria-label={t("Search", "খুঁজুন")}
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
          <div className="relative">
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-full relative focus:outline-none transition-colors duration-200"
              aria-label={t("Notifications", "নোটিফিকেশন")}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
          <div className="relative group">
            <button
              type="button"
              className="flex items-center space-x-2 focus:outline-none"
              aria-label={t("User menu", "ব্যবহারকারী মেনু")}
            >
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">
                {user.fullName?.charAt(0) || "U"}
              </div>
              <span className="hidden md:inline-block text-sm font-medium text-gray-700">
                {user.fullName?.split(" ")[0] || "User"}
              </span>
              <svg
                className="h-4 w-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <User className="h-4 w-4 mr-2" />
                {t("Profile", "প্রোফাইল")}
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Settings className="h-4 w-4 mr-2" />
                {t("Settings", "সেটিংস")}
              </a>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 focus:outline-none transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t("Sign out", "সাইন আউট")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-6 border-b border-gray-100">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={getTabClass(tab.id)}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.id === "appointments" && (
                <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  3
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Date and Status Bar */}
      <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
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
    </div>
  );
};

// Empty Appointments State Component
const EmptyAppointmentsState = ({
  t,
  onNavigate,
}: {
  t: (key: string, fallback?: string) => string;
  onNavigate: (page: string) => void;
}) => (
  <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
    <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-4">
      <Calendar className="h-12 w-12 text-blue-300" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">
      {t("No appointments yet", "এখনো কোন অ্যাপয়েন্টমেন্ট নেই")}
    </h3>
    <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto mb-6">
      {t(
        "You don't have any upcoming appointments. Book your first appointment to get started.",
        "আপনার কোন আসন্ন অ্যাপয়েন্টমেন্ট নেই। শুরু করতে এখনই একটি অ্যাপয়েন্টমেন্ট বুক করুন।"
      )}
    </p>
    <button
      onClick={() => onNavigate("book-appointment")}
      className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
    >
      <Plus className="h-4 w-4 mr-2" />
      {t("Book Appointment", "অ্যাপয়েন্টমেন্ট বুক করুন")}
    </button>
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
  <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
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
          <tr
            key={appointment.id}
            className="hover:bg-gray-50 transition-colors"
          >
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
                {appointment.specialization}
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
              <button className="text-blue-600 hover:text-blue-900 mr-4 transition-colors">
                {t("View", "দেখুন")}
              </button>
              <button className="text-red-600 hover:text-red-900 transition-colors">
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
    {loginData.error && (
      <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
        {loginData.error}
      </div>
    )}

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
          <button
            type="button"
            className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {t("Google", "গুগল")}
          </button>

          <button
            type="button"
            className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill="#1877F2"
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
            {t("Facebook", "ফেসবুক")}
          </button>
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
    {signupData.error && (
      <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
        {signupData.error}
      </div>
    )}

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
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        placeholder="••••••••"
      />
    </div>

    <button
      type="submit"
      disabled={loading}
      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
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
        className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
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

  const toggleView = (newView: "login" | "signup") => {
    setView(newView);
    // Clear any previous errors
    setLoginData({ ...loginData, error: "" });
    setSignupData({ ...signupData, error: "" });
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
          {activeTab === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      {t("Upcoming", "আসন্ন")}
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">3</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      {t("Completed", "সম্পন্ন")}
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">12</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-100 rounded-lg p-3">
                    <svg
                      className="h-6 w-6 text-yellow-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      {t("Pending", "মুলতুবি")}
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">1</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-100 rounded-lg p-3">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      {t("Records", "রেকর্ড")}
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">8</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "appointments" && (
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
          )}

          {activeTab === "medical-records" && (
            <div className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden p-8">
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t("Medical Records", "মেডিকেল রেকর্ড")}
                </h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  {t(
                    "Your medical records will appear here once they are added by your healthcare provider.",
                    "আপনার মেডিকেল রেকর্ড এখানে প্রদর্শিত হবে যখন আপনার স্বাস্থ্যসেবা প্রদানকারী তা যোগ করবেন।"
                  )}
                </p>
              </div>
            </div>
          )}

          {activeTab === "prescriptions" && (
            <div className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden p-8">
              <div className="text-center py-12">
                <Pill className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t("Prescriptions", "প্রেসক্রিপশন")}
                </h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  {t(
                    "Your prescriptions will appear here once they are added by your healthcare provider.",
                    "আপনার প্রেসক্রিপশন এখানে প্রদর্শিত হবে যখন আপনার স্বাস্থ্যসেবা প্রদানকারী তা যোগ করবেন।"
                  )}
                </p>
              </div>
            </div>
          )}
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
