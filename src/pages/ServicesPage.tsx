import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Award,
  ChevronRight,
  Phone,
  MapPin,
  CheckCircle,
  User,
  Shield,
  Heart,
  Activity,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import servicesData from "../data/dummy-data.json";

interface Service {
  id: string;
  title: string;
  title_bn: string;
  slug: string;
  category: string;
  description: string;
  description_bn: string;
  short_description: string;
  short_description_bn: string;
  price_range: string;
  duration: string;
  image_url: string;
  benefits: string[];
  procedure_steps: string[];
  is_featured: boolean;
  display_order: number;
}

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleBookAppointment = (serviceSlug: string) => {
    if (!user) {
      onNavigate("login");
      return;
    }
    onNavigate("book-appointment");
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  // Group services by category
  const generalServices = servicesData.services.filter(
    (s) => s.category === "general"
  );
  const cosmeticServices = servicesData.services.filter(
    (s) => s.category === "cosmetic"
  );
  const orthodonticServices = servicesData.services.filter(
    (s) => s.category === "orthodontics"
  );
  const surgeryServices = servicesData.services.filter(
    (s) => s.category === "surgery"
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 to-slate-900/50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              {t("Our Dental Services", "আমাদের দন্ত সেবাসমূহ")}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t(
                "Comprehensive dental care delivered with precision and compassion",
                "নির্ভুলতা এবং সহানুভূতির সাথে ব্যাপক দন্ত চিকিৎসা প্রদান"
              )}
            </p>

            <div className="flex justify-center mt-8">
              <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/20">
                <CheckCircle className="h-4 w-4 mr-2" />
                {t("15+ Years of Excellence", "১৫+ বছরের শ্রেষ্ঠত্ব")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Highlights */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl mb-6">
                <User className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">
                {t("Expert Care", "বিশেষজ্ঞ যত্ন")}
              </h3>
              <p className="text-slate-600 text-center">
                {t(
                  "15+ years of experience in advanced dental procedures",
                  "উন্নত দন্ত পদ্ধতিতে ১৫+ বছরের অভিজ্ঞতা"
                )}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">
                {t("Patient-Centered", "রোগী-কেন্দ্রিক")}
              </h3>
              <p className="text-slate-600 text-center">
                {t(
                  "Personalized treatment plans tailored to your needs",
                  "আপনার চাহিদা অনুযায়োগে ব্যক্তিগতকৃত চিকিৎসা পরিকল্পনা"
                )}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">
                {t("Advanced Technology", "উন্নত প্রযুক্তি")}
              </h3>
              <p className="text-slate-600 text-center">
                {t(
                  "State-of-the-art equipment for precise diagnostics",
                  "নির্ভুল রোগ নির্ণয়ের জন্য আধুনিক সরঞ্জাম"
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
            {t("Our Specialized Services", "আমাদের বিশেষজ্ঞ সেবাসমূহ")}
          </h2>

          <div className="space-y-16">
            {/* General Dentistry */}
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-xl p-8 border border-slate-100">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl mb-6">
                    <Award className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    {t("General Dentistry", "সাধারণ দন্ত চিকিৎসা")}
                  </h3>
                  <p className="text-slate-600 mb-6">
                    {t(
                      "Comprehensive examinations, cleanings, fillings, and preventive care",
                      "ব্যাপক পরীক্ষণ, ক্লিনিং, ফিলিং এবং প্রতিরোধনী যত্ন"
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {generalServices.slice(0, 4).map((service) => (
                    <div
                      key={service.id}
                      onClick={() => handleBookAppointment(service.slug)}
                      className="group bg-white p-4 rounded-xl border border-slate-200 hover:border-teal-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      <div className="aspect-[4/3] overflow-hidden rounded-lg mb-3">
                        <img
                          src={service.image_url}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h4 className="font-semibold text-slate-900 mb-2">
                        {t(service.title, service.title_bn)}
                      </h4>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {t(
                          service.short_description,
                          service.short_description_bn
                        )}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-teal-600 font-semibold">
                          {service.price_range}
                        </span>
                        <div className="flex items-center text-slate-500 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{service.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={() =>
                    onNavigate(`/services/${generalServices[0]?.slug}`)
                  }
                  className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium transition-colors duration-300"
                >
                  {t(
                    "View All General Services",
                    "সমস্ত সাধারণ দন্ত সেবাসমূহ দেখুন"
                  )}
                  <ChevronRight className="h-5 w-5 ml-1" />
                </button>
              </div>
            </div>

            {/* Cosmetic Dentistry */}
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-xl p-8 border border-slate-100">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl mb-6">
                    <Heart className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    {t("Cosmetic Dentistry", "সৌন্দর্যবর্ধক দন্ত চিকিৎসা")}
                  </h3>
                  <p className="text-slate-600 mb-6">
                    {t(
                      "Teeth whitening, veneers, bonding, and smile makeovers",
                      "দাঁত সাদা করা, ভিনিয়ার, বন্ডিং এবং হাসি মেকওভার"
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {cosmeticServices.slice(0, 4).map((service) => (
                    <div
                      key={service.id}
                      onClick={() => handleBookAppointment(service.slug)}
                      className="group bg-white p-4 rounded-xl border border-slate-200 hover:border-teal-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      <div className="aspect-[4/3] overflow-hidden rounded-lg mb-3">
                        <img
                          src={service.image_url}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h4 className="font-semibold text-slate-900 mb-2">
                        {t(service.title, service.title_bn)}
                      </h4>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {t(
                          service.short_description,
                          service.short_description_bn
                        )}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-teal-600 font-semibold">
                          {service.price_range}
                        </span>
                        <div className="flex items-center text-slate-500 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{service.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={() =>
                    onNavigate(`/services/${cosmeticServices[0]?.slug}`)
                  }
                  className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium transition-colors duration-300"
                >
                  {t(
                    "View All Cosmetic Services",
                    "সমস্ত সৌন্দর্যবর্ধক দন্ত সেবাসমূহ দেখুন"
                  )}
                  <ChevronRight className="h-5 w-5 ml-1" />
                </button>
              </div>
            </div>

            {/* Orthodontics */}
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-xl p-8 border border-slate-100">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl mb-6">
                    <Shield className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    {t("Orthodontics", "অর্থোডন্টিক্স")}
                  </h3>
                  <p className="text-slate-600 mb-6">
                    {t(
                      "Traditional and modern braces for all ages",
                      "সমস্ত আধুনিক এবং আধুনিক ব্রেস সমস্ত বয়স"
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {orthodonticServices.slice(0, 4).map((service) => (
                    <div
                      key={service.id}
                      onClick={() => handleBookAppointment(service.slug)}
                      className="group bg-white p-4 rounded-xl border border-slate-200 hover:border-teal-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      <div className="aspect-[4/3] overflow-hidden rounded-lg mb-3">
                        <img
                          src={service.image_url}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h4 className="font-semibold text-slate-900 mb-2">
                        {t(service.title, service.title_bn)}
                      </h4>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {t(
                          service.short_description,
                          service.short_description_bn
                        )}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-teal-600 font-semibold">
                          {service.price_range}
                        </span>
                        <div className="flex items-center text-slate-500 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{service.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={() =>
                    onNavigate(`/services/${orthodonticServices[0]?.slug}`)
                  }
                  className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium transition-colors duration-300"
                >
                  {t(
                    "View All Orthodontic Services",
                    "সমস্ত অর্থোডন্টিক্স সেবাসমূহ দেখুন"
                  )}
                  <ChevronRight className="h-5 w-5 ml-1" />
                </button>
              </div>
            </div>

            {/* Oral Surgery */}
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-xl p-8 border border-slate-100">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl mb-6">
                    <Award className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    {t("Oral Surgery", "মৌখিক সার্জারি")}
                  </h3>
                  <p className="text-slate-600 mb-6">
                    {t(
                      "Extractions, implants, and surgical procedures",
                      "এক্সট্রাকশন, ইমপ্লান্ট এবং সার্জিকাল পদ্ধতি"
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {surgeryServices.slice(0, 4).map((service) => (
                    <div
                      key={service.id}
                      onClick={() => handleBookAppointment(service.slug)}
                      className="group bg-white p-4 rounded-xl border border-slate-200 hover:border-teal-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      <div className="aspect-[4/3] overflow-hidden rounded-lg mb-3">
                        <img
                          src={service.image_url}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h4 className="font-semibold text-slate-900 mb-2">
                        {t(service.title, service.title_bn)}
                      </h4>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {t(
                          service.short_description,
                          service.short_description_bn
                        )}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-teal-600 font-semibold">
                          {service.price_range}
                        </span>
                        <div className="flex items-center text-slate-500 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{service.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={() =>
                    onNavigate(`/services/${surgeryServices[0]?.slug}`)
                  }
                  className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium transition-colors duration-300"
                >
                  {t(
                    "View All Surgery Services",
                    "সমস্ত সার্জারি সেবাসমূহ দেখুন"
                  )}
                  <ChevronRight className="h-5 w-5 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 to-slate-900/50"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="mb-8">
            <Activity className="h-12 w-12 text-teal-400 mx-auto mb-4" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t(
              "Ready to Transform Your Smile?",
              "আপনার হাসি রূপান্তর করতে প্রস্তুত?"
            )}
          </h2>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            {t(
              "Schedule your consultation today and take the first step towards a healthier, more confident smile",
              "আজই আপনার পরামর্শের সময় নির্ধারণ করুন এবং স্বাস্থ্যকর, আত্মবিশ্বাসী হাসির প্রথম পদক্ষেপ নিন"
            )}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => onNavigate("book-appointment")}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <Calendar className="h-5 w-5 mr-2" />
              {t("Book Consultation", "পরামর্শ বুক করুন")}
            </button>
            <div className="flex items-center space-x-6 text-gray-300">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-teal-400" />
                <span>+880 1234 567890</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-teal-400" />
                <span>Dhanmondi, Dhaka</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
