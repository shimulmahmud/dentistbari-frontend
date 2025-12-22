import { useState, useEffect } from "react";
import heroImage from "../assets/images/image.png";
import {
  Users,
  Clock,
  Star,
  ChevronRight,
  Calendar,
  ChevronLeft,
  Phone,
  MapPin,
  CheckCircle,
  Shield,
  Heart,
  Stethoscope,
  Activity,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import dummyData from "../data/dummy-data.json";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { t } = useLanguage();
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [currentTreatment, setCurrentTreatment] = useState(0);
  const [treatmentAutoPlay, setTreatmentAutoPlay] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Data arrays must be declared before useEffect hooks that use them
  const features = [
    {
      icon: Stethoscope,
      title: t("Expert Care", "বিশেষজ্ঞ যত্ন"),
      description: t(
        "BDS qualified with 15+ years of clinical excellence",
        "বিডিএস যোগ্যতা সহ ১৫+ বছরের ক্লিনিকাল শ্রেষ্ঠত্ব"
      ),
    },
    {
      icon: Heart,
      title: t("Patient-Centered", "রোগী-কেন্দ্রিক"),
      description: t(
        "Personalized treatment plans with compassionate care",
        "সহানুভূতিশীল যত্ন সহ ব্যক্তিগতকৃত চিকিৎসা পরিকল্পনা"
      ),
    },
    {
      icon: Shield,
      title: t("Advanced Technology", "উন্নত প্রযুক্তি"),
      description: t(
        "State-of-the-art equipment for precise diagnostics",
        "নির্ভুল রোগ নির্ণয়ের জন্য আধুনিক সরঞ্জাম"
      ),
    },
  ];

  const treatments = [
    {
      id: 1,
      name: t("Teeth Whitening", "দাঁত সাদা করা"),
      description: t(
        "Professional teeth whitening for a brighter smile",
        "উজ্জ্বল হাসির জন্য পেশাদার দাঁত সাদা করা"
      ),
      image: heroImage,
    },
    {
      id: 2,
      name: t("Dental Implants", "দন্ত ইমপ্লান্ট"),
      description: t(
        "Permanent solution for missing teeth",
        "হারানো দাঁতের জন্য স্থায়ী সমাধান"
      ),
      image: heroImage,
    },
    {
      id: 3,
      name: t("Orthodontics", "অর্থোডন্টিক্স"),
      description: t(
        "Straighten your teeth with modern braces",
        "আধুনিক ব্রেস দিয়ে আপনার দাঁত সোজা করুন"
      ),
      image: heroImage,
    },
    {
      id: 4,
      name: t("Cosmetic Dentistry", "সৌন্দর্যবর্ধক দন্ত চিকিৎসা"),
      description: t(
        "Enhance your smile with our cosmetic procedures",
        "আমাদের সৌন্দর্যবর্ধক পদ্ধতিতে আপনার হাসি উন্নত করুন"
      ),
      image: heroImage,
    },
  ];

  const clinicHighlights = [
    {
      title: t("Modern Facilities", "আধুনিক সুবিধা"),
      description: t(
        "State-of-the-art clinic with advanced dental equipment",
        "উন্নত দন্ত চিকিৎসা সরঞ্জাম সহ আধুনিক ক্লিনিক"
      ),
      icon: Shield,
    },
    {
      title: t("Flexible Scheduling", "নমনীয় সময়সূচী"),
      description: t(
        "Evening and weekend appointments available for your convenience",
        "আপনার সুবিধার জন্য সন্ধ্যা এবং সাপ্তাহিক ছুটির দিনে অ্যাপয়েন্টমেন্ট উপলব্ধ"
      ),
      icon: Clock,
    },
    {
      title: t("Comprehensive Care", "ব্যাপক যত্ন"),
      description: t(
        "All your dental needs under one roof",
        "একই ছাদের নিচে আপনার সমস্ত দন্ত চিকিৎসা প্রয়োজনীয়তা"
      ),
      icon: Heart,
    },
  ];

  const faqs = [
    {
      question: t(
        "How often should I get a dental check-up?",
        "আমি কত ঘন ঘন দন্ত পরীক্ষা করানো উচিত?"
      ),
      answer: t(
        "We recommend a dental check-up and cleaning every six months for most patients. This allows us to detect any issues early and keep your teeth and gums healthy.",
        "আমরা বেশিরভাগ রোগীর জন্য প্রতি ছয় মাসে একবার দন্ত পরীক্ষা এবং পরিষ্কার করার পরামর্শ দিই। এটি আমাদের কোনো সমস্যা তড়িৎ সনাক্ত করতে এবং আপনার দাঁত ও মাড়ি সুস্থ রাখতে সাহায্য করে।"
      ),
    },
    {
      question: t(
        "What is the best way to whiten my teeth?",
        "আমার দাঁত সাদা করার সেরা উপায় কি?"
      ),
      answer: t(
        "Professional teeth whitening is the safest and most effective option. Over-the-counter products can sometimes cause sensitivity. We can provide a customized treatment plan for you.",
        "পেশাদার দাঁত সাদা করা সবচেয়ে নিরাপদ এবং কার্যকর বিকল্প। ওভার-দ্য-কাউন্টার পণ্যগুলি কখনও কখনও সংবেদনশীলতা সৃষ্টি করতে পারে। আমরা আপনার জন্য একটি কাস্টমাইজড চিকিৎসা পরিকল্পনা প্রদান করতে পারি।"
      ),
    },
    {
      question: t("Are dental implants safe?", "দন্ত ইমপ্লান্ট কি নিরাপদ?"),
      answer: t(
        "Yes, dental implants are a very safe and well-established procedure. They are made of biocompatible materials like titanium, which fuse with your jawbone. Dr. Ripon Ali has extensive experience in implant dentistry.",
        "হ্যাঁ, দন্ত ইমপ্লান্ট একটি খুবই নিরাপদ এবং প্রতিষ্ঠিত পদ্ধতি। এগুলি টাইটানিয়ামের মতো বায়োকম্পেটিবল উপকরণ দিয়ে তৈরি যা আপনার জবড়ার হাড়ের সাথে মিশে যায়। ডাঃ রিপন আলীর ইমপ্লান্ট ডেন্টিস্ট্রিতে ব্যাপক অভিজ্ঞতা রয়েছে।"
      ),
    },
    {
      question: t("Do you accept insurance?", "আপনি কি বীমা গ্রহণ করেন?"),
      answer: t(
        "Yes, we work with most major insurance providers. Please contact our clinic with your insurance information, and our staff will be happy to assist you with the process.",
        "হ্যাঁ, আমরা বেশিরভাগ প্রধান বীমা প্রদানকারীর সাথে কাজ করি। আপনার বীমা তথ্য নিয়ে আমাদের ক্লিনিকে যোগাযোগ করুন, এবং প্রক্রিয়াটিতে আপনাকে সাহায্য করতে আমাদের কর্মীরা খুশি হবে।"
      ),
    },
  ];

  useEffect(() => {
    // Get approved and featured testimonials
    const featuredTestimonials = dummyData.testimonials
      .filter((testimonial) => testimonial.is_featured && testimonial.approved)
      .slice(0, 4);

    setTestimonials(featuredTestimonials);
  }, []);

  // Auto-play functionality for testimonials
  useEffect(() => {
    if (!autoPlay || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, testimonials.length]);

  // Auto-play functionality for treatment slider
  useEffect(() => {
    if (!treatmentAutoPlay || treatments.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentTreatment((prev) => (prev + 1) % treatments.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [treatmentAutoPlay, treatments.length]);

  const handlePrevTestimonial = () => {
    setAutoPlay(true);
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNextTestimonial = () => {
    setAutoPlay(false);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setAutoPlay(true);
    setCurrentTestimonial(index);
  };

  const handlePrevTreatment = () => {
    setTreatmentAutoPlay(false);
    setCurrentTreatment((prev) =>
      prev === 0 ? treatments.length - 1 : prev - 1
    );
  };

  const handleNextTreatment = () => {
    setTreatmentAutoPlay(false);
    setCurrentTreatment((prev) => (prev + 1) % treatments.length);
  };

  const goToTreatment = (index: number) => {
    setTreatmentAutoPlay(false);
    setCurrentTreatment(index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 to-slate-900/50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-teal-500/20 border border-teal-500/30 rounded-full text-sm font-medium text-teal-200 backdrop-blur-sm">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {t("Accepting New Patients", "নতুন রোগী ভর্তি চলছে")}
                </div>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  {t("Your Smile, Our", "আপনার হাসি, আমাদের")}
                  <span className="block text-teal-400">
                    {t("Excellence", "শ্রেষ্ঠত্ব")}
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  {t(
                    "Dr. Md. Ripon Ali - Excellence in Dental Care Since 2008",
                    "ডাঃ মোঃ রিপন আলী - ২০০৮ সাল থেকে দন্ত চিকিৎসায় শ্রেষ্ঠত্ব"
                  )}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate("book-appointment")}
                  className="group bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Calendar className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                  {t("Book Consultation", "পরামর্শ বুক করুন")}
                </button>
                <button
                  onClick={() => onNavigate("services")}
                  className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
                >
                  {t("Explore Services", "পরিষেবাগুলি দেখুন")}
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-teal-400">15+</div>
                  <div className="text-sm text-gray-400">
                    {t("Years Experience", "বছরের অভিজ্ঞতা")}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-400">5000+</div>
                  <div className="text-sm text-gray-400">
                    {t("Happy Patients", "সন্তুষ্ট রোগী")}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-400">98%</div>
                  <div className="text-sm text-gray-400">
                    {t("Success Rate", "সাফল্যের হার")}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-3xl"></div>

              {/* Treatment Image Slider */}
              <div className="relative rounded-3xl shadow-2xl overflow-hidden h-96">
                <div
                  className="flex transition-transform duration-700 ease-in-out h-full"
                  style={{
                    transform: `translateX(-${currentTreatment * 100}%)`,
                  }}
                >
                  {treatments.map((treatment) => (
                    <div key={treatment.id} className="w-full flex-shrink-0">
                      <div className="relative h-96">
                        <img
                          src={treatment.image}
                          alt={treatment.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {treatment.name}
                          </h3>
                          <p className="text-gray-200">
                            {treatment.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Slider Controls */}
                {treatments.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevTreatment}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-2 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      aria-label="Previous treatment"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleNextTreatment}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-2 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      aria-label="Next treatment"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>

                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                      {treatments.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToTreatment(index)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            index === currentTreatment
                              ? "w-8 bg-teal-400"
                              : "w-2 bg-white/30 hover:bg-white/50"
                          }`}
                          aria-label={`Go to treatment ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinic Highlights Section */}
      <section className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-slate-900/40"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("Why Choose Dentist Bari", "কেন ডেন্টিস্ট বাড়ি বেছে নেবেন")}
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t(
                "Experience the difference with our patient-centered approach",
                "আমাদের রোগী-কেন্দ্রিক পদ্ধতির সাথে পার্থক্য অনুভব করুন"
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {clinicHighlights.map((highlight, index) => (
              <div
                key={index}
                className="group relative bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-white/20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-teal-600 to-teal-700 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <highlight.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate("about")}
              className="inline-flex items-center px-6 py-3 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              {t(
                "Learn More About Our Practice",
                "আমাদের অনুশীলন সম্পর্কে আরও জানুন"
              )}
              <ChevronRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-slate-900/40"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("Why Patients Trust Us", "কেন রোগীরা আমাদের উপর আস্থা রাখেন")}
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t(
                "Delivering exceptional dental care with compassion and precision",
                "সহানুভূতি এবং নির্ভুলতার সাথে ব্যতিক্রমী দন্ত চিকিৎসা প্রদান করা"
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-white/20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-teal-600 to-teal-700 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 to-slate-900/50"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t("Patient Success Stories", "রোগীদের সাফল্যের গল্প")}
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                {t(
                  "Real experiences from real patients who transformed their smiles",
                  "যারা তাদের হাসি রূপান্তরিত করেছেন তাদের কাছ থেকে প্রকৃত অভিজ্ঞতা"
                )}
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="overflow-hidden rounded-2xl shadow-2xl bg-white/10 backdrop-blur-sm">
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateX(-${currentTestimonial * 100}%)`,
                  }}
                >
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="w-full flex-shrink-0 px-8 py-12"
                    >
                      <div className="text-center">
                        {/* Patient Image */}
                        <div className="flex justify-center mb-6">
                          <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-teal-400/30 shadow-lg">
                            <img
                              src={
                                testimonial.image_url ||
                                "https://picsum.photos/seed/patient/200/200.jpg"
                              }
                              alt={testimonial.patient_name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>

                        <div className="flex justify-center mb-6">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-6 w-6 ${
                                i < testimonial.rating
                                  ? "text-amber-400 fill-current"
                                  : "text-gray-400"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xl text-white mb-8 leading-relaxed italic">
                          "{testimonial.comment}"
                        </p>
                        <div className="font-semibold text-lg text-white">
                          {testimonial.patient_name}
                        </div>
                        <div className="text-gray-300">
                          {testimonial.profession ||
                            testimonial.treatment ||
                            "Patient"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {testimonials.length > 1 && (
                <>
                  <button
                    onClick={handlePrevTestimonial}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={handleNextTestimonial}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>

                  <div className="flex justify-center mt-8 space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToTestimonial(index)}
                        className={`h-3 rounded-full transition-all duration-300 ${
                          index === currentTestimonial
                            ? "w-8 bg-teal-400"
                            : "w-3 bg-white/30 hover:bg-white/50"
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section - Redesigned for Professionalism */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-slate-900/40"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("Frequently Asked Questions", "প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী")}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-teal-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t(
                "Find answers to common questions about our services and dental care.",
                "আমাদের পরিষেবা এবং দন্ত চিকিৎসা সম্পর্কে সাধারণ প্রশ্নের উত্তর খুঁজুন।"
              )}
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`
                    bg-white/5 backdrop-blur-sm rounded-lg transition-all duration-300
                    ${
                      isOpen
                        ? "bg-white/10 border-t-4 border-amber-400"
                        : "hover:bg-white/10"
                    }
                  `}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left p-7 focus:outline-none"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-semibold text-white pr-4">
                        {faq.question}
                      </h3>
                      <ChevronDown
                        className={`
                          h-5 w-5 transition-transform duration-300 flex-shrink-0
                          ${
                            isOpen
                              ? "rotate-180 text-amber-400"
                              : "text-gray-400"
                          }
                        `}
                      />
                    </div>
                  </button>
                  <div
                    className={`
                      overflow-hidden transition-all duration-500 ease-in-out
                      ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                    `}
                  >
                    <p className="p-7 pt-0 text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
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
              "Begin Your Journey to Optimal Dental Health",
              "সর্বোত্তম দন্ত্য স্বাস্থ্যের যাত্রা শুরু করুন"
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
              className="group bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <Calendar className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
              {t("Schedule Consultation", "পরামর্শের সময় নির্ধারণ করুন")}
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
