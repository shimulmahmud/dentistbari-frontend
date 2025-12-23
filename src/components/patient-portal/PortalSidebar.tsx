import {
  LayoutDashboard,
  Calendar,
  FileText,
  Pill,
  LogOut,
  User,
  ChevronRight,
  Home,
} from "lucide-react";

interface PortalSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: { fullName: string; email: string };
  t: (key: string, fallback?: string) => string;
  handleLogout: () => void;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const PortalSidebar = ({
  activeTab,
  setActiveTab,
  user,
  t,
  handleLogout,
  onNavigate,
  isOpen,
  setIsOpen,
}: PortalSidebarProps) => {
  const tabs = [
    {
      id: "dashboard",
      label: t("Dashboard", "ড্যাশবোর্ড"),
      icon: LayoutDashboard,
    },
    {
      id: "appointments",
      label: t("Appointments", "অ্যাপয়েন্টমেন্ট"),
      icon: Calendar,
    },
    {
      id: "medical-records",
      label: t("Medical Records", "মেডিকেল রেকর্ড"),
      icon: FileText,
    },
    {
      id: "prescriptions",
      label: t("Prescriptions", "প্রেসক্রিপশন"),
      icon: Pill,
    },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false); // Close mobile sidebar
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 left-0 h-screen w-64 bg-gradient-to-b from-slate-900 to-slate-800 z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Close button for mobile */}
        <button
          className="md:hidden absolute top-4 right-4 p-2 hover:bg-slate-700 rounded-lg transition-colors"
          onClick={() => setIsOpen(false)}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Logo/Branding */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">DentistBari</h1>
              <p className="text-xs text-slate-400">Patient Portal</p>
            </div>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {user?.fullName || "Patient"}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {user?.email || ""}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 flex-1 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </div>
                {isActive && <ChevronRight className="h-4 w-4" />}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-700 space-y-2">
          <button
            onClick={() => onNavigate("home")}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white text-sm font-medium transition-all duration-200"
          >
            <Home className="h-5 w-5" />
            <span>{t("Back to Home", "হোমে ফিরে যান")}</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 text-sm font-medium transition-all duration-200"
          >
            <LogOut className="h-5 w-5" />
            <span>{t("Sign Out", "সাইন আউট")}</span>
          </button>
        </div>
      </div>
    </>
  );
};
