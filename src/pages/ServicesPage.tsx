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
  Sparkles,
  List, // Using a list icon for "All Services"
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import servicesData from "../data/dummy-data.json";
import { useAuth } from "../contexts/AuthContext";
import { db, Service } from "../lib/database";
import { useCallback } from "react";

// ... (Service and ServicesPageProps interfaces remain the same)

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const { t } = useLanguage();
  const { user, isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [creatingService, setCreatingService] = useState(false);
  const [newServiceTitle, setNewServiceTitle] = useState("");
  // --- CHANGE 1: Set initial category to "all" ---
  const [activeCategory, setActiveCategory] = useState("all");

  const handleBookAppointment = (serviceSlug: string) => {
    if (!user) {
      onNavigate("login");
      return;
    }
    onNavigate("book-appointment");
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  // --- CHANGE 2: Add "All Services" to the categories array ---
  const serviceCategories = [
    { id: "all", title: t("All Services", "সমস্ত সেবা"), icon: List },
    {
      id: "general",
      title: t("General Dentistry", "সাধারণ দন্ত চিকিৎসা"),
      icon: Award,
    },
    {
      id: "cosmetic",
      title: t("Cosmetic Dentistry", "সৌন্দর্যবর্ধক দন্ত চিকিৎসা"),
      icon: Sparkles,
    },
    {
      id: "orthodontics",
      title: t("Orthodontics", "অর্থোডন্টিক্স"),
      icon: Shield,
    },
    {
      id: "surgery",
      title: t("Oral Surgery", "মৌখিক সার্জারি"),
      icon: Activity,
    },
  ];

  // --- CHANGE 3: Update filtering logic to handle the "all" case ---
  useEffect(() => {
    // load from db so admin updates are reflected
    setServices(db.getAllServices());
  }, []);

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  const handleCreateService = useCallback(() => {
    if (!newServiceTitle.trim()) return;
    const slug = newServiceTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const service: Service = {
      id: "svc-" + Date.now(),
      title: newServiceTitle,
      slug,
      category: "general",
      description: newServiceTitle,
      short_description: newServiceTitle,
      created_at: new Date().toISOString(),
    } as Service;
    db.createService(service);
    setServices(db.getAllServices());
    setNewServiceTitle("");
    setCreatingService(false);
  }, [newServiceTitle]);

  const handleDeleteService = useCallback((id: string) => {
    if (!confirm("Delete service?")) return;
    db.deleteService(id);
    setServices(db.getAllServices());
  }, []);

  return (
    <div className="min-h-screen">
      {/* --- NEW HERO SECTION --- */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 to-slate-900/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            {t("Our Dental Services", "আমাদের দন্ত সেবাসমূহ")}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t(
              "Comprehensive dental care delivered with precision and compassion.",
              "নির্ভুলতা এবং সহানুভূতির সাথে ব্যাপক দন্ত চিকিৎসা প্রদান।"
            )}
          </p>
          <div className="flex justify-center mt-8">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/20">
              <CheckCircle className="h-4 w-4 mr-2" />
              {t("15+ Years of Excellence", "১৫+ বছরের শ্রেষ্ঠত্ব")}
            </div>
          </div>
        </div>
      </section>

      {/* --- NEW MAIN CONTENT AREA --- */}
      <section className="bg-gradient-to-br from-slate-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* --- CATEGORY TABS --- */}
          <div className="flex flex-wrap justify-center mb-12 border-b border-gray-200">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 py-4 px-6 border-b-2 font-medium text-sm transition-colors duration-300 ${
                  activeCategory === category.id
                    ? "border-teal-600 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <category.icon className="h-5 w-5" />
                <span>{category.title}</span>
              </button>
            ))}
          </div>

          {/* --- SERVICE CARDS GRID --- */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl hover:border-teal-200 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                  <img
                    src={service.image_url}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {t(service.title, service.title_bn)}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {t(service.short_description, service.short_description_bn)}
                  </p>
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <span className="text-teal-600 font-semibold">
                      {service.price_range}
                    </span>
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{service.duration}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => onNavigate(`/services/${service.slug}`)}
                      className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-300 text-center"
                    >
                      {t("Learn More", "আরও জানুন")}
                    </button>
                    <button
                      onClick={() => handleBookAppointment(service.slug)}
                      className="flex-1 border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 text-center"
                    >
                      {t("Book Now", "বুক করুন")}
                    </button>
                    {isAdmin() && (
                      <button
                        onClick={() => handleDeleteService(service.id)}
                        className="ml-2 text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isAdmin() && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white p-4 rounded shadow">
            <div className="flex items-center space-x-2 mb-3">
              <h3 className="font-semibold">Admin: Manage Services</h3>
              <button
                onClick={() => setCreatingService((s) => !s)}
                className="btn btn-sm"
              >
                {creatingService ? "Cancel" : "Create Service"}
              </button>
            </div>
            {creatingService && (
              <div className="flex gap-2">
                <input
                  value={newServiceTitle}
                  onChange={(e) => setNewServiceTitle(e.target.value)}
                  className="input"
                  placeholder="Service title"
                />
                <button
                  onClick={handleCreateService}
                  className="btn btn-primary"
                >
                  Create
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- CTA SECTION --- */}
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
              "Schedule your consultation today and take the first step towards a healthier, more confident smile.",
              "আজই আপনার পরামর্শের সময় নির্ধারণ করুন এবং স্বাস্থ্যকর, আত্মবিশ্বাসী হাসির প্রথম পদক্ষেপ নিন।"
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => onNavigate("book-appointment")}
              className="group bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <Calendar className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
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
