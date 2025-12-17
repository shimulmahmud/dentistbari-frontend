import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
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

    // Find the service with the matching slug
    const foundService = (servicesData.services as Service[]).find(
      (s) => s.slug === slug
    );
    if (foundService) {
      setService(foundService);
    } else {
      // Handle case when service is not found
      console.error("Service not found");
    }
  }, []);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {t("Service not found", "সেবাটি পাওয়া যায়নি")}
          </h2>
          <button
            onClick={() => onNavigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {t("Go back", "ফিরে যান")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back button and navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => onNavigate("services")}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            {t("Back to Services", "সেবাসমূহে ফিরে যান")}
          </button>
        </div>
      </div>

      {/* Service Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {t(service.title, service.title_bn)}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {t(service.short_description, service.short_description_bn)}
              </p>
              <div className="flex items-center space-x-4 mb-6">
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {service.price_range}
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">{service.duration}</span>
              </div>
              <button
                onClick={handleBookAppointment}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t("Book Appointment", "অ্যাপয়েন্টমেন্ট বুক করুন")}
              </button>
            </div>
            {service.image_url && (
              <div className="mt-10 lg:mt-0">
                <img
                  src={service.image_url}
                  alt={t(service.title, service.title_bn)}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Service Details */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t("Service Details", "সেবার বিবরণ")}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {t(service.description, service.description_bn)}
                </p>

                {service.procedure_steps &&
                  service.procedure_steps.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        {t("Procedure Steps", "প্রক্রিয়া ধাপসমূহ")}
                      </h3>
                      <ol className="list-decimal pl-5 space-y-2">
                        {service.procedure_steps.map((step, index) => (
                          <li key={index} className="text-gray-600">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
              </div>
            </div>

            {service.benefits && service.benefits.length > 0 && (
              <div className="mt-12 lg:mt-0">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {t("Benefits", "সুবিধাসমূহ")}
                  </h3>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetailsPage;
