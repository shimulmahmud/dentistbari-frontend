import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Clock,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { LocationMap } from "./LocationMap";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { t } = useLanguage();

  const quickLinks = [
    { name: t("About Us", "আমাদের সম্পর্কে"), href: "about" },
    { name: t("Services", "সেবা"), href: "services" },
    {
      name: t("Book Appointment", "অ্যাপয়েন্টমেন্ট"),
      href: "book-appointment",
    },
    { name: t("Patient Portal", "রোগী পোর্টাল"), href: "patient-portal" },
  ];

  const services = [
    { name: t("General Dentistry", "সাধারণ দন্ত চিকিৎসা"), href: "services" },
    {
      name: t("Cosmetic Dentistry", "সৌন্দর্যবর্ধক দন্ত চিকিৎসা"),
      href: "services",
    },
    { name: t("Orthodontics", "অর্থোডন্টিক্স"), href: "services" },
    { name: t("Oral Surgery", "মৌখিক সার্জারি"), href: "services" },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section - Map and Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-12">
          {/* Contact Info */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-xl shadow-xl">
            <h3 className="text-white text-xl font-bold mb-6 flex items-center">
              <div className="w-10 h-0.5 bg-teal-400 mr-3"></div>
              {t("Contact Us", "যোগাযোগ করুন")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <MapPin className="h-5 w-5 text-teal-400 mt-0.5 flex-shrink-0 group-hover:text-teal-300 transition-colors" />
                <p className="text-sm">
                  {t(
                    "123 Dental Street, Dhaka 1207",
                    "১২৩ ডেন্টাল স্ট্রিট, ঢাকা ১২০৭"
                  )}
                </p>
              </div>
              <div className="flex items-center space-x-3 group">
                <Phone className="h-5 w-5 text-teal-400 group-hover:text-teal-300 transition-colors" />
                <a
                  href="tel:+8801234567890"
                  className="text-sm hover:text-teal-400 transition-colors"
                >
                  +880 1234-567890
                </a>
              </div>
              <div className="flex items-center space-x-3 group">
                <Mail className="h-5 w-5 text-teal-400 group-hover:text-teal-300 transition-colors" />
                <a
                  href="mailto:info@dentistbari.com"
                  className="text-sm hover:text-teal-400 transition-colors"
                >
                  info@dentistbari.com
                </a>
              </div>
              <div className="pt-4 border-t border-slate-600">
                <h4 className="font-medium text-white text-sm mb-3 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-teal-400" />
                  {t("Opening Hours", "খোলার সময়")}:
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>{t("Sun-Thu", "রবি-বৃহঃ")}:</span>
                    <span>{t("9AM-8PM", "সকাল ৯টা - রাত ৮টা")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("Friday", "শুক্রবার")}:</span>
                    <span>{t("3PM-8PM", "বিকাল ৩টা - রাত ৮টা")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-400">
                      {t("Saturday", "শনিবার")}:
                    </span>
                    <span className="text-red-400">{t("Closed", "বন্ধ")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-2 rounded-xl shadow-xl h-full">
              <LocationMap
                position={[23.8103, 90.4125]}
                zoom={15}
                popupText="Dentist Bari - Dhaka"
                className="h-full min-h-[280px] w-full rounded-lg overflow-hidden"
              />
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-slate-700 py-12">
          <div>
            <h3 className="text-white text-xl font-bold mb-6 flex items-center">
              <span className="text-teal-400">Dentist</span> Bari
            </h3>
            <p className="text-sm mb-6 leading-relaxed">
              {t(
                "Providing quality dental care with a focus on patient comfort and satisfaction.",
                "রোগীর আরাম এবং সন্তুষ্টির উপর মনোনিবেশ সহ মানসম্পন্ন দন্ত চিকিৎসা প্রদান করা।"
              )}
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-slate-700 hover:bg-teal-600 p-2 rounded-lg transition-colors duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-slate-700 hover:bg-teal-600 p-2 rounded-lg transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-slate-700 hover:bg-teal-600 p-2 rounded-lg transition-colors duration-300"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 flex items-center">
              <ChevronRight className="h-4 w-4 mr-2 text-teal-400" />
              {t("Quick Links", "দ্রুত লিংক")}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => onNavigate(link.href)}
                    className="text-sm hover:text-teal-400 transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 flex items-center">
              <ChevronRight className="h-4 w-4 mr-2 text-teal-400" />
              {t("Our Services", "আমাদের সেবা")}
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => onNavigate(service.href)}
                    className="text-sm hover:text-teal-400 transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 flex items-center">
              <ChevronRight className="h-4 w-4 mr-2 text-teal-400" />
              {t("Newsletter", "নিউজলেটার")}
            </h4>
            <p className="text-sm mb-4">
              {t(
                "Subscribe to get dental care tips and updates.",
                "দন্ত পরিচর্যা টিপস এবং আপডেট পেতে সাবস্ক্রাইব করুন।"
              )}
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder={t("Your email", "আপনার ইমেল")}
                className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors"
              />
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                {t("Subscribe", "সাবস্ক্রাইব করুন")}
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 py-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-center md:text-left mb-4 md:mb-0">
            © {new Date().getFullYear()} Dentist Bari.{" "}
            {t("All rights reserved.", "সর্বস্বত্ব সংরক্ষিত।")}
          </p>
          <div className="flex space-x-6 text-sm">
            <a
              href="#"
              className="hover:text-teal-400 transition-colors duration-300"
            >
              {t("Privacy Policy", "গোপনীয়তা নীতি")}
            </a>
            <a
              href="#"
              className="hover:text-teal-400 transition-colors duration-300"
            >
              {t("Terms of Service", "সেবার শর্তাবলী")}
            </a>
          </div>
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm font-medium mb-2 sm:mb-0 flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            {t("Emergency? Call us 24/7:", "জরুরি? আমাদের কল করুন ২৪/৭:")}
          </p>
          <a
            href="tel:+8801234567890"
            className="font-bold hover:underline flex items-center group"
          >
            <Phone className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
            +880 1234-567890
          </a>
        </div>
      </div>
    </footer>
  );
}
