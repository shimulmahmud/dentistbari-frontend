import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Clock,
  Calendar,
  CheckCircle,
  Phone,
  MapPin,
  Users,
  Award,
  ChevronRight,
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

interface ServiceDetailsPageProps {
  onNavigate: (page: string) => void;
}

export function ServiceDetailsPage({ onNavigate }: ServiceDetailsPageProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  const handleBookAppointment = () => {
    if (!user) {
      onNavigate("login");
      return;
    }
    onNavigate("book-appointment");
  };

  useEffect(() => {
    // Extract slug from URL
    const path = window.location.pathname.split("/");
    const slug = path[path.length - 1];

    // Find service with matching slug
    const foundService = (servicesData.services as Service[]).find(
      (s) => s.slug === slug
    );

    if (foundService) {
      setService(foundService);
    } else {
      // Handle case when service is not found
      console.error("Service not found");
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-slate-900/40"></div>
        <div className="relative text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-white">{t("Loading...", "লোড হচ্ছে...")}</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-slate-900/40"></div>
        <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">
            {t("Service not found", "সেবা পাওয়া যায়নি")}
          </h2>
          <button
            onClick={() => onNavigate("services")}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            {t("Go back", "ফিরে যান")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 to-slate-900/50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate("services")}
              className="flex items-center text-teal-200 hover:text-white transition-colors duration-300"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              {t("Back to Services", "সেবাসমূহে ফিরে যান")}
            </button>

            <button
              onClick={handleBookAppointment}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Calendar className="h-5 w-5 mr-2" />
              {t("Book Appointment", "অ্যাপয়েন্টমেন্ট বুক করুন")}
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mt-12">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-teal-500/20 border border-teal-500/30 rounded-full text-sm font-medium text-teal-200 backdrop-blur-sm">
                {service.category}
              </div>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {t(service.title, service.title_bn)}
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed">
                {t(service.short_description, service.short_description_bn)}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <Award className="h-5 w-5 text-teal-400 mr-2" />
                  <span className="text-white font-medium">
                    {service.price_range}
                  </span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <Clock className="h-5 w-5 text-teal-400 mr-2" />
                  <span className="text-white font-medium">
                    {service.duration}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-3xl"></div>
              <img
                src={service.image_url}
                alt={t(service.title, service.title_bn)}
                className="relative rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Details Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  {t("About This Service", "এই সেবা সম্পর্কে")}
                </h2>
                <div className="prose max-w-none text-slate-600 leading-relaxed">
                  <p>{t(service.description, service.description_bn)}</p>
                </div>
              </div>

              {service.procedure_steps &&
                service.procedure_steps.length > 0 && (
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                      {t("Procedure Steps", "প্রক্রিয়া ধাপসমূহ")}
                    </h2>
                    <div className="space-y-4">
                      {service.procedure_steps.map((step, index) => (
                        <div key={index} className="flex">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-teal-600 to-teal-700 text-white flex items-center justify-center font-bold mr-4 shadow-lg">
                            {index + 1}
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow-md border border-slate-100 flex-1">
                            <p className="text-slate-600">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            {service.benefits && service.benefits.length > 0 && (
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-xl p-8 border border-slate-700">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Users className="h-6 w-6 mr-2 text-teal-400" />
                    {t("Benefits", "সুবিধাসমূহ")}
                  </h2>
                  <ul className="space-y-4">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 to-slate-900/50"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
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
              onClick={handleBookAppointment}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <Calendar className="h-5 w-5 mr-2" />
              {t("Book Appointment", "অ্যাপয়েন্টমেন্ট বুক করুন")}
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

export default ServiceDetailsPage;
