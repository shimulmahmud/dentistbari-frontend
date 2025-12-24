import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiHome,
  FiUsers,
  FiCalendar,
  FiSettings,
  FiLogOut,
  FiChevronDown,
  FiBell,
  FiSearch,
  FiUser,
  FiMessageSquare,
  FiPieChart,
} from "react-icons/fi";

// Define types for menu items
interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  exact?: boolean;
}

// Sidebar item component
const SidebarItem = ({
  item,
  isActive,
  onClick,
  isCollapsed,
}: {
  item: MenuItem;
  isActive: boolean;
  onClick: () => void;
  isCollapsed: boolean;
}) => (
  <li>
    <button
      onClick={onClick}
      className={`flex items-center w-full p-3 rounded-lg transition-colors ${
        isActive
          ? "bg-indigo-50 text-indigo-600 font-medium"
          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
      }`}
    >
      <span className="flex-shrink-0">{item.icon}</span>
      {!isCollapsed && (
        <span className="ml-3 overflow-hidden whitespace-nowrap">
          {item.name}
        </span>
      )}
    </button>
  </li>
);

// Search bar component
const SearchBar = () => (
  <div className="relative max-w-md w-full">
    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    <input
      type="text"
      placeholder="Search..."
      className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:focus:ring-indigo-400 dark:placeholder-gray-400"
    />
  </div>
);

// Notification bell component
const NotificationBell = ({ count = 0 }: { count?: number }) => (
  <button className="relative p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none">
    <FiBell className="w-5 h-5" />
    {count > 0 && (
      <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
        {count > 9 ? "9+" : count}
      </span>
    )}
  </button>
);

// Menu items
const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <FiHome className="w-5 h-5" />,
    exact: true,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <FiUsers className="w-5 h-5" />,
  },
  {
    name: "Appointments",
    path: "/admin/appointments",
    icon: <FiCalendar className="w-5 h-5" />,
  },
  {
    name: "Services",
    path: "/admin/services",
    icon: <FiPieChart className="w-5 h-5" />,
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: <FiMessageSquare className="w-5 h-5" />,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: <FiSettings className="w-5 h-5" />,
  },
];

const ModernAdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // State
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifications] = useState(3); // Mock notifications count

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));
  };

  // Handle navigation
  const handleNavigation = (path: string) => {
    navigate(path);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  // Check if a menu item is active
  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Set initial dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".user-menu")) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar */}
      <div className={`lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={toggleSidebar}
          ></div>
          <div className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-white dark:bg-gray-800">
            <div className="absolute top-0 right-0 p-1 -mr-14">
              <button
                onClick={toggleSidebar}
                className="flex items-center justify-center w-12 h-12 rounded-full focus:outline-none focus:bg-gray-600"
              >
                <FiX className="w-6 h-6 text-white" />
              </button>
            </div>
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Admin Panel
              </h1>
            </div>
            <div className="flex-1 h-0 mt-5 overflow-y-auto">
              <nav className="px-2 space-y-1">
                {menuItems.map((item) => (
                  <SidebarItem
                    key={item.path}
                    item={item}
                    isActive={isActive(item.path, item.exact)}
                    onClick={() => handleNavigation(item.path)}
                    isCollapsed={false}
                  />
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div
        className={`hidden lg:flex lg:flex-shrink-0 ${
          isCollapsed ? "lg:w-20" : "lg:w-64"
        }`}
      >
        <div className="flex flex-col w-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="flex flex-col flex-1 h-0">
            <div className="flex items-center justify-between h-16 flex-shrink-0 px-4">
              {!isCollapsed && (
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Admin Panel
                </h1>
              )}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-1 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                {isCollapsed ? (
                  <FiChevronDown className="w-6 h-6 transform -rotate-90" />
                ) : (
                  <FiChevronDown className="w-6 h-6 transform rotate-90" />
                )}
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <nav className="px-2 py-4 space-y-1">
                {menuItems.map((item) => (
                  <SidebarItem
                    key={item.path}
                    item={item}
                    isActive={isActive(item.path, item.exact)}
                    onClick={() => handleNavigation(item.path)}
                    isCollapsed={isCollapsed}
                  />
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navigation */}
        <div className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              <FiMenu className="w-6 h-6" />
            </button>
            <div className="ml-4">
              <SearchBar />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 rounded-full hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              {darkMode ? (
                <FiSun className="w-5 h-5" />
              ) : (
                <FiMoon className="w-5 h-5" />
              )}
            </button>
            <NotificationBell count={notifications} />
            <div className="relative ml-3 user-menu">
              <div>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-800 flex items-center justify-center">
                    <FiUser className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
                  </div>
                  {!isCollapsed && (
                    <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      {user?.name || "User"}
                    </span>
                  )}
                </button>
              </div>
              <AnimatePresence>
                {userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800"
                  >
                    <div className="px-4 py-3">
                      <p className="text-sm text-gray-900 dark:text-white">
                        Signed in as
                      </p>
                      <p className="text-sm font-medium text-gray-700 truncate dark:text-gray-300">
                        {user?.email || "user@example.com"}
                      </p>
                    </div>
                    <div className="border-t border-gray-100 dark:border-gray-700"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      <FiLogOut className="w-5 h-5 mr-3 text-gray-400" />
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ModernAdminLayout;
