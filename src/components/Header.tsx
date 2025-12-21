import { useState } from "react";
import {
  Menu,
  X,
  Phone,
  Clock,
  Globe,
  User,
  LogIn,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();

  const navigation = [
    { name: t("Home", "হোম"), href: "home" },
    { name: t("About", "সম্পর্কে"), href: "about" },
    { name: t("Services", "সেবা"), href: "services" },
    { name: t("Contact", "যোগাযোগ"), href: "contact" },
  ];

  const handleBookAppointment = () => {
    if (!user) {
      // Redirect to login page if not authenticated
      onNavigate("patient-portal");
      setMobileMenuOpen(false);
      return;
    }
    // If user is logged in, proceed to booking
    onNavigate("book-appointment");
    setMobileMenuOpen(false);
  };

  const renderAuthButtons = () => {
    if (!user) {
      return (
        <button
          onClick={() => onNavigate("patient-portal")}
          className="flex items-center space-x-1 hover:text-slate-200 transition-colors duration-300"
        >
          <LogIn className="h-4 w-4" />
          <span className="hidden md:inline">{t("Login", "লগইন")}</span>
        </button>
      );
    }

    return (
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-1 hover:text-slate-200 transition-colors duration-300"
        >
          <User className="h-4 w-4" />
          <span className="hidden md:inline">
            {t("My Account", "আমার অ্যাকাউন্ট")}
          </span>
          <ChevronDown className="h-4 w-4" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
            <button
              onClick={() => {
                onNavigate("patient-portal");
                setDropdownOpen(false);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-slate-100"
            >
              {t("Dashboard", "ড্যাশবোর্ড")}
            </button>
            <button
              onClick={() => {
                signOut();
                setDropdownOpen(false);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-slate-100"
            >
              {t("Logout", "লগআউট")}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <a
                href="tel:+8801234567890"
                className="flex items-center space-x-2 hover:text-teal-400 transition-colors duration-300"
              >
                <Phone className="h-4 w-4" />
                <span>+880 1234-567890</span>
              </a>
              <div className="hidden md:flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>
                  {t(
                    "Sun-Thu: 9AM-8PM, Fri: 3PM-8PM",
                    "রবি-বৃহঃ: সকাল ৯টা-রাত ৮টা, শুক্রঃ বিকাল ৩টা-রাত ৮টা"
                  )}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLanguage(language === "en" ? "bn" : "en")}
                className="flex items-center space-x-1 hover:text-teal-400 transition-colors duration-300"
              >
                <Globe className="h-4 w-4" />
                <span>{language === "en" ? "বাংলা" : "English"}</span>
              </button>
              {renderAuthButtons()}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <button
              onClick={() => onNavigate("home")}
              className="text-2xl font-bold text-slate-800 hover:text-teal-600 transition-colors duration-300"
            >
              <span className="text-teal-600">
                {language === "en" ? "Dentist" : "ডেন্টিস্ট"}
              </span>{" "}
              {language === "en" ? "Bari" : "বাড়ি"}
            </button>
          </div>

          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item) => (
              <button
                key={item.href}
                onClick={() => onNavigate(item.href)}
                className={`${
                  currentPage === item.href
                    ? "text-teal-600 border-b-2 border-teal-600"
                    : "text-slate-700 hover:text-teal-600"
                } px-3 py-2 text-sm font-medium transition-colors duration-300`}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={handleBookAppointment}
              className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-2 rounded-full hover:from-teal-700 hover:to-teal-800 transition-all duration-300 transform hover:scale-105 font-medium shadow-md hover:shadow-lg"
            >
              {t("Book Appointment", "অ্যাপয়েন্টমেন্ট বুক করুন")}
            </button>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-700 hover:text-teal-600 transition-colors duration-300"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-2 border-t border-slate-200">
            {navigation.map((item) => (
              <button
                key={item.href}
                onClick={() => {
                  onNavigate(item.href);
                  setMobileMenuOpen(false);
                }}
                className={`${
                  currentPage === item.href
                    ? "bg-teal-50 text-teal-600 border-l-4 border-teal-600"
                    : "text-slate-700 hover:bg-slate-50"
                } block w-full text-left px-4 py-3 rounded-md transition-colors duration-300`}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={handleBookAppointment}
              className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white px-4 py-3 rounded-md hover:from-teal-700 hover:to-teal-800 transition-all duration-300 font-medium shadow-md"
            >
              {t("Book Appointment", "অ্যাপয়েন্টমেন্ট বুক করুন")}
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
