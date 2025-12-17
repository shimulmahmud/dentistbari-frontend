import { useState } from "react";
import { Menu, X, Phone, Clock, Globe, User, LogIn } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      onNavigate("login");
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
          onClick={() => onNavigate("login")}
          className="flex items-center space-x-1 hover:text-blue-100 transition"
        >
          <LogIn className="h-4 w-4" />
          <span className="hidden md:inline">{t("Login", "লগইন")}</span>
        </button>
      );
    }

    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={() => {
            onNavigate("patient-portal");
            setMobileMenuOpen(false);
          }}
          className="flex items-center space-x-1 hover:text-blue-100 transition"
        >
          <User className="h-4 w-4" />
          <span className="hidden md:inline">
            {t("My Account", "আমার অ্যাকাউন্ট")}
          </span>
        </button>
        <button
          onClick={() => {
            signOut();
            setMobileMenuOpen(false);
          }}
          className="hover:text-blue-100 transition text-xs"
        >
          {t("Logout", "লগআউট")}
        </button>
      </div>
    );
  };

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <a
                href="tel:+8801234567890"
                className="flex items-center space-x-2 hover:text-blue-100 transition"
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
                className="flex items-center space-x-1 hover:text-blue-100 transition"
              >
                <Globe className="h-4 w-4" />
                <span>{language === "en" ? "বাংলা" : "English"}</span>
              </button>
              {renderAuthButtons()}
            </div>
          </div>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <button
              onClick={() => onNavigate("home")}
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
            >
              <span className="text-teal-500">Dentist</span> Bari
            </button>
          </div>

          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item) => (
              <button
                key={item.href}
                onClick={() => onNavigate(item.href)}
                className={`${
                  currentPage === item.href
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                } px-3 py-2 text-sm font-medium transition`}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={handleBookAppointment}
              className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-teal-600 transition transform hover:scale-105 font-medium"
            >
              {t("Book Appointment", "অ্যাপয়েন্টমেন্ট বুক করুন")}
            </button>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-2">
            {navigation.map((item) => (
              <button
                key={item.href}
                onClick={() => {
                  onNavigate(item.href);
                  setMobileMenuOpen(false);
                }}
                className={`${
                  currentPage === item.href
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                } block w-full text-left px-4 py-2 rounded-md transition`}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={handleBookAppointment}
              className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white px-4 py-2 rounded-md hover:from-blue-700 hover:to-teal-600 transition font-medium"
            >
              {t("Book Appointment", "অ্যাপয়েন্টমেন্ট বুক করুন")}
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
