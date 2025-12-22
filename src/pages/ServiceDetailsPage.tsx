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
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import servicesData from "../data/dummy-data.json";

// --- UPDATE: Define the new structure for a procedure step ---
interface ProcedureStep {
  title: string;
  title_bn: string;
  description: string;
  description_bn: string;
}

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
  // --- UPDATE: Change procedure_steps to use the new interface ---
  procedure_steps: ProcedureStep[] | string[]; // Can be an array of objects OR an array of strings
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
  const [openStepIndex, setOpenStepIndex] = useState<number | null>(null);

  const handleBookAppointment = () => {
    if (!user) {
      onNavigate("login");
      return;
    }
    onNavigate("book-appointment");
  };

  // --- RE-INTRODUCE: Helper function to generate descriptions for procedure steps ---
  const getStepDescription = (step: string) => {
    switch (step.toLowerCase()) {
      case "examination":
        return t(
          "We will thoroughly examine your oral health to identify any potential issues.",
          "আমরা কোনো সম্ভাব্য সমস্যা চিহ্নিত করার জন্য আপনার মৌখিক স্বাস্থ্য সম্পূর্ণভাবে পরীক্ষা করব।"
        );
      case "cleaning":
        return t(
          "A professional cleaning will be performed to remove plaque and tartar buildup.",
          "প্লাক এবং টার্টার অপসারণ করার জন্য একটি পেশাদার পরিষ্কার করা হবে।"
        );
      case "assessment":
        return t(
          "We will assess the overall health of your teeth and gums to determine the best course of action.",
          "সেরা কোর্স অফ অ্যাকশন নির্ধারণ করার জন্য আমরা আপনার দাঁত এবং মাড়ির সামগ্রিক স্বাস্থ্য মূল্যায় করব।"
        );
      case "treatment plan":
        return t(
          "Based on the assessment, we will create a personalized treatment plan tailored to your needs.",
          "মূল্যায়র উপর ভিত্তি করে, আমরা আপনার চাহিদা অনুযায়ী একটি ব্যক্তিগতকৃত চিকিৎসা পরিকল্পনা তৈরি করব।"
        );
      // ... other cases
      default:
        return t(
          "This step is crucial for the overall success of the treatment.",
          "এই ধাপটি চিকিৎসার সামগ্রিক সাফল্যতার জন্য অত্যন্ত গুরুত্বপূর্ণ।"
        );
    }
  };

  useEffect(() => {
    const path = window.location.pathname.split("/");
    const slug = path[path.length - 1];
    const foundService = (servicesData.services as Service[]).find(
      (s) => s.slug === slug
    );

    if (foundService) {
      setService(foundService);
    } else {
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
        <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-slate-900/40"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Hero Section */}
        <section className="relative text-white overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <button
              onClick={() => onNavigate("services")}
              className="flex items-center text-teal-200 hover:text-white transition-colors duration-300 mb-6 lg:mb-0"
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
              <div className="absolute -inset-4 bg-teal-500/10 rounded-3xl blur-2xl"></div>
              <img
                src={service.image_url}
                alt={t(service.title, service.title_bn)}
                className="relative rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </section>

        {/* Service Details Section */}
        <section className="py-20">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/10">
                <h2 className="text-3xl font-bold text-white mb-6">
                  {t("About This Service", "এই সেবা সম্পর্কে")}
                </h2>
                <div className="prose max-w-none text-gray-300 leading-relaxed">
                  <p>{t(service.description, service.description_bn)}</p>
                </div>
              </div>

              {/* Procedure Steps with Accordion */}
              {service.procedure_steps &&
                service.procedure_steps.length > 0 && (
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/10">
                    <h2 className="text-3xl font-bold text-white mb-6">
                      {t("Procedure Steps", "প্রক্রিয়া ধাপসমূহ")}
                    </h2>
                    <div className="space-y-4">
                      {service.procedure_steps.map((step, index) => {
                        const isOpen = openStepIndex === index;
                        // --- ADD CHECK: Determine if the step is an object or a string ---
                        const isStepObject =
                          typeof step === "object" &&
                          step !== null &&
                          "title" in step;

                        return (
                          <div
                            key={index}
                            className={`
                            bg-white/5 backdrop-blur-sm rounded-lg border transition-all duration-300
                            ${
                              isOpen
                                ? "bg-white/10 border-amber-400/50"
                                : "border-white/20"
                            }
                          `}
                          >
                            <button
                              onClick={() =>
                                setOpenStepIndex(isOpen ? null : index)
                              }
                              className="w-full text-left p-5 focus:outline-none"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-teal-600 to-teal-700 text-white flex items-center justify-center font-bold text-sm mr-4 shadow-lg">
                                    {index + 1}
                                  </div>
                                  {/* --- CONDITIONAL RENDERING: Use title from data if it exists, otherwise use the string itself --- */}
                                  <h3 className="text-lg font-semibold text-white">
                                    {isStepObject
                                      ? t(step.title, step.title_bn)
                                      : t(step, step)}
                                  </h3>
                                </div>
                                <ChevronDown
                                  className={`h-5 w-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ml-4 ${
                                    isOpen ? "rotate-180" : ""
                                  }`}
                                />
                              </div>
                            </button>
                            <div
                              className={`grid transition-all duration-500 ease-in-out ${
                                isOpen
                                  ? "grid-rows-[1fr] opacity-100"
                                  : "grid-rows-[0fr] opacity-0"
                              }`}
                            >
                              <div className="overflow-hidden">
                                {/* --- CONDITIONAL RENDERING: Use description from data if it exists, otherwise generate one --- */}
                                <p className="p-5 pt-0 text-gray-300 leading-relaxed">
                                  {isStepObject
                                    ? t(step.description, step.description_bn)
                                    : getStepDescription(step)}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
            </div>

            {service.benefits && service.benefits.length > 0 && (
              <div className="lg:col-span-1">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/10">
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
        </section>

        {/* CTA Section */}
        <section className="relative text-white overflow-hidden">
          <div className="text-center">
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
                className="group bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <Calendar className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
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
    </div>
  );
}

export default ServiceDetailsPage;
