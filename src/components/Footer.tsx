import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
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

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section - Map and Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8 md:py-12">
          {/* Contact Info - Moved to top on mobile */}
          <div className="lg:order-2 bg-gray-800 p-6 rounded-lg">
            <h3 className="text-white text-xl font-bold mb-4">
              {t("Contact Us", "যোগাযোগ করুন")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-teal-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm">
                  {t(
                    "123 Dental Street, Dhaka 1207",
                    "১২৩ ডেন্টাল স্ট্রিট, ঢাকা ১২০৭"
                  )}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-teal-400" />
                <a
                  href="tel:+8801234567890"
                  className="text-sm hover:text-teal-400 transition"
                >
                  +880 1234-567890
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-teal-400" />
                <a
                  href="mailto:info@dentistbari.com"
                  className="text-sm hover:text-teal-400 transition"
                >
                  info@dentistbari.com
                </a>
              </div>
              <div className="pt-2">
                <h4 className="font-medium text-white text-sm mb-2">
                  {t("Opening Hours", "খোলার সময়")}:
                </h4>
                <p className="text-sm">
                  {t("Sun-Thu: 9AM-8PM", "রবি-বৃহঃ: সকাল ৯টা - রাত ৮টা")}
                </p>
                <p className="text-sm">
                  {t("Friday: 3PM-8PM", "শুক্রবার: বিকাল ৩টা - রাত ৮টা")}
                </p>
                <p className="text-red-400 text-sm">
                  {t("Saturday: Closed", "শনিবার: বন্ধ")}
                </p>
              </div>
            </div>
          </div>

          {/* Map - Takes full width on mobile, 2/3 on desktop */}
          <div className="lg:col-span-2 lg:order-1">
            <LocationMap
              position={[23.8103, 90.4125]}
              zoom={15}
              popupText="Dentist Bari - Dhaka"
              className="h-64 sm:h-80 w-full rounded-lg overflow-hidden shadow-lg"
            />
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 border-t border-gray-800 py-8 md:pt-12">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">
              <span className="text-teal-400">Dentist</span> Bari
            </h3>
            <p className="text-sm mb-4">
              {t(
                "Providing quality dental care with a focus on patient comfort and satisfaction.",
                "রোগীর আরাম এবং সন্তুষ্টির উপর মনোনিবেশ সহ মানসম্পন্ন দন্ত চিকিৎসা প্রদান করা।"
              )}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-teal-400 transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-teal-400 transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-teal-400 transition">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">
              {t("Quick Links", "দ্রুত লিংক")}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => onNavigate(link.href)}
                    className="text-sm hover:text-teal-400 transition"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">
              {t("Contact Info", "যোগাযোগের তথ্য")}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <a
                  href="tel:+8801234567890"
                  className="text-sm hover:text-teal-400 transition"
                >
                  +880 1234-567890
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-teal-400 flex-shrink-0" />
                <a
                  href="mailto:info@dentistbari.com"
                  className="text-sm hover:text-teal-400 transition"
                >
                  info@dentistbari.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-teal-400 flex-shrink-0" />
                <a
                  href="https://www.google.com/maps/place/Dhaka/@23.7806207,90.3492857,12z/data=!3m1!4b1!4m6!3m5!1s0x3755b8b087026b81:0x8fa563bbdd5904c2!8m2!3d23.810332!4d90.4125181!16zL20vMDFmNjhy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-teal-400 transition"
                >
                  {t(
                    "123 Dental Street, Dhaka 1207",
                    "১২৩ ডেন্টাল স্ট্রিট, ঢাকা ১২০৭"
                  )}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-center md:text-left">
            © {new Date().getFullYear()} Dentist Bari.{" "}
            {t("All rights reserved.", "সর্বস্বত্ব সংরক্ষিত।")}
          </p>
        </div>
      </div>

      <div className="bg-red-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium">
            {t("Emergency? Call us 24/7:", "জরুরি? আমাদের কল করুন ২৪/৭:")}
            <a
              href="tel:+8801234567890"
              className="ml-2 font-bold hover:underline"
            >
              +880 1234-567890
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
