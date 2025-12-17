import { useState, useEffect } from "react";
import { Search } from "lucide-react";
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
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleBookNow = () => {
    if (!user) {
      onNavigate("login");
      return;
    }
    onNavigate("book-appointment");
  };

  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [services, searchQuery]);

  const loadServices = async () => {
    try {
      // Use the services data from the local JSON file
      setServices(servicesData.services);
    } catch (error) {
      console.error("Error loading services:", error);
    }
  };

  const filterServices = () => {
    let filtered = services;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((s) => s.title.toLowerCase().includes(query));
    }
    setFilteredServices(filtered);
  };

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("Our Dental Services", "আমাদের দন্ত সেবা")}
          </h1>
          <p className="text-xl text-blue-100">
            {t(
              "Comprehensive dental care for all your needs",
              "আপনার সমস্ত চাহিদার জন্য ব্যাপক দন্ত চিকিৎসা"
            )}
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder={t("Search services...", "সেবা খুঁজুন...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {t("No services found", "কোন সেবা পাওয়া যায়নি")}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition"
                >
                  {service.image_url && (
                    <img
                      src={service.image_url}
                      alt={service.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.short_description}
                    </p>
                    {service.price_range && (
                      <p className="text-teal-600 font-semibold mb-4">
                        {t("Starting from", "শুরু হয়")} {service.price_range}
                      </p>
                    )}
                    <div className="mt-4 flex space-x-3">
                      <button
                        onClick={() => onNavigate(`/services/${service.slug}`)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        {t("Learn More", "আরও জানুন")}
                      </button>
                      <button
                        onClick={handleBookNow}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        {t("Book Now", "বুক করুন")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
