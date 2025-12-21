import { Calendar, Bell, Search, LogOut, User, Settings } from "lucide-react";
import { LayoutDashboard, FileText, Pill } from "lucide-react";

interface DashboardHeaderProps {
  user: any;
  t: (key: string, fallback?: string) => string;
  handleLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DashboardHeader = ({
  user,
  t,
  handleLogout,
  activeTab,
  setActiveTab,
}: DashboardHeaderProps) => {
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
