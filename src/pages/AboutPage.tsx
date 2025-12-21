import {
  Award,
  GraduationCap,
  Heart,
  Target,
  Users,
  Calendar,
  MapPin,
  Phone,
  CheckCircle,
  Clock,
  Shield,
  Stethoscope,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

import { heroImage } from "../constants/constants";

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const { t } = useLanguage();

  const values = [
    {
      icon: Heart,
      title: t("Patient-Centered Care", "রোগী-কেন্দ্রিক যত্ন"),
      description: t(
        "We put your comfort and well-being first",
        "আমরা আপনার আরাম এবং সুস্থতা প্রথমে রাখি"
      ),
    },
    {
      icon: Award,
      title: t("Excellence", "শ্রেষ্ঠত্ব"),
      description: t(
        "Committed to the highest quality care",
        "সর্বোচ্চ মানের যত্নে প্রতিশ্রুতিবদ্ধ"
      ),
    },
    {
      icon: Users,
      title: t("Community Focus", "সম্প্রদায় ফোকাস"),
      description: t(
        "Dedicated to improving oral health",
        "মৌখিক স্বাস্থ্য উন্নতিতে নিবেদিত"
      ),
    },
    {
      icon: Target,
      title: t("Continuous Learning", "ক্রমাগত শেখা"),
      description: t(
        "Always updating our skills",
        "সর্বদা আমাদের দক্ষতা আপডেট করা"
      ),
    },
  ];

  const education = [
    {
      degree: "Bachelor of Dental Surgery (BDS)",
      institution: "University of Dhaka",
      year: "2008",
      description: t("Completed with honors", "সম্মানসহ সম্পন্ন"),
    },
    {
      degree: "Master of Dental Surgery (MDS) - Prosthodontics",
      institution: "Bangladesh Medical College",
      year: "2015",
      description: t(
        "Specialized in prosthodontics",
        "প্রস্থেডন্টিক্সে বিশেষজ্ঞ"
      ),
    },
    {
      degree: "Fellowship in Implant Dentistry (FICD)",
      institution: "International College of Dentists",
      year: "2018",
      description: t(
        "Advanced implantology training",
        "উন্নত ইমপ্লান্টোলজি প্রশিক্ষণ"
      ),
    },
  ];

  const experience = [
    {
      position: t("Senior Prosthodontist", "সিনিয়র প্রস্থেডন্টিস্ট"),
      organization: t("Dentist Bari", "ডেন্টিস্ট বাড়ি"),
      period: "2015 - Present",
      description: t(
        "Leading the prosthodontics department with focus on advanced restorative procedures",
        "উন্নত পুনরুদ্ধারমূলক পদ্ধতির উপর ফোকাস সহ প্রস্থেডন্টিক্স বিভাগের নেতৃত্ব"
      ),
    },
    {
      position: t("Associate Dentist", "সহযোগী দন্ত চিকিৎসক"),
      organization: t(
        "Bangladesh Dental Hospital",
        "বাংলাদেশ ডেন্টাল হাসপাতাল"
      ),
      period: "2010 - 2015",
      description: t(
        "Provided comprehensive dental care and gained expertise in various dental procedures",
        "বিস্তৃত দন্ত চিকিৎসা প্রদান এবং বিভিন্ন দন্ত পদ্ধতিতে দক্ষতা অর্জন"
      ),
    },
    {
      position: t("Junior Dentist", "জুনিয়র দন্ত চিকিৎসক"),
      organization: t("City Dental Care", "সিটি ডেন্টাল কেয়ার"),
      period: "2008 - 2010",
      description: t(
        "Started professional career with focus on general dentistry",
        "সাধারণ দন্ত চিকিৎসার উপর ফোকাস সহ পেশাদার কর্মজীবন শুরু"
      ),
    },
  ];

  const specializations = [
    t("Prosthodontics", "প্রস্থেডন্টিক্স"),
    t("Implant Dentistry", "ইমপ্লান্ট ডেন্টিস্ট্রি"),
    t("Cosmetic Dentistry", "সৌন্দর্যবর্ধক দন্ত চিকিৎসা"),
    t("Full Mouth Rehabilitation", "সম্পূর্ণ মুখ পুনর্বাসন"),
    t("Smile Makeover", "হাসি পুনর্গঠন"),
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 to-slate-900/50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-teal-500/20 border border-teal-500/30 rounded-full text-sm font-medium text-teal-200 backdrop-blur-sm mb-6">
              <CheckCircle className="h-4 w-4 mr-2" />
              {t("15+ Years of Excellence", "১৫+ বছরের শ্রেষ্ঠত্ব")}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              {t("About Dr. Md. Ripon Ali", "ডাঃ মোঃ রিপন আলী সম্পর্কে")}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t(
                "Dedicated to providing exceptional dental care with a focus on patient comfort and cutting-edge technology",
                "রোগীর আরাম এবং অত্যাধুনিক প্রযুক্তির উপর ফোকাস সহ ব্যতিক্রমী দন্ত চিকিৎসা প্রদানে নিবেদিত"
              )}
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src={heroImage}
                alt="Dr. Md. Ripon Ali"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  {t(
                    "Meet Dr. Md. Ripon Ali",
                    "ডাঃ মোঃ রিপন আলীর সাথে দেখা করুন"
                  )}
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {t(
                    "Dr. Ripon Ali is a highly skilled prosthodontist with over 15 years of experience in dental care. He graduated from the University of Dhaka with a BDS degree and later obtained his MDS in Prosthodontics. His commitment to excellence and patient satisfaction has made him one of the most trusted dentists in the region.",
                    "ডাঃ রিপন আলী একজন অত্যন্ত দক্ষ প্রস্থেডন্টিস্ট যার দন্ত চিকিৎসায় ১৫ বছরেরও বেশি অভিজ্ঞতা রয়েছে। তিনি ঢাকা বিশ্ববিদ্যালয় থেকে বিডিএস ডিগ্রি নিয়ে স্নাতক হন এবং পরবর্তীতে প্রস্থেডন্টিক্সে এমডিএস অর্জন করেন। শ্রেষ্ঠত্ব এবং রোগী সন্তুষ্টির প্রতি তার প্রতিশ্রুতি তাকে অঞ্চলের সবচেয়ে বিশ্বস্ত দন্ত চিকিৎসকদের একজন করে তুলেছে।"
                  )}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-md border border-slate-100">
                  <div className="text-2xl font-bold text-teal-600">15+</div>
                  <div className="text-sm text-slate-600">
                    {t("Years Experience", "বছরের অভিজ্ঞতা")}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md border border-slate-100">
                  <div className="text-2xl font-bold text-teal-600">5000+</div>
                  <div className="text-sm text-slate-600">
                    {t("Happy Patients", "সন্তুষ্ট রোগী")}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md border border-slate-100">
                  <div className="text-2xl font-bold text-teal-600">98%</div>
                  <div className="text-sm text-slate-600">
                    {t("Success Rate", "সাফল্যের হার")}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md border border-slate-100">
                  <div className="text-2xl font-bold text-teal-600">12+</div>
                  <div className="text-sm text-slate-600">
                    {t("Awards", "পুরস্কার")}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate("book-appointment")}
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {t("Book Appointment", "অ্যাপয়েন্টমেন্ট বুক করুন")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-slate-900/40"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("Education & Credentials", "শিক্ষা ও যোগ্যতা")}
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t(
                "Extensive education and training in prosthodontics and implant dentistry",
                "প্রস্থেডন্টিক্স এবং ইমপ্লান্ট ডেন্টিস্ট্রিতে ব্যাপক শিক্ষা এবং প্রশিক্ষণ"
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {education.map((edu, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-teal-500/20 p-3 rounded-lg border border-teal-500/30">
                    <GraduationCap className="h-6 w-6 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-gray-300 mb-1">{edu.institution}</p>
                    <p className="text-sm text-teal-400 font-medium mb-2">
                      {edu.year}
                    </p>
                    <p className="text-gray-400 text-sm">{edu.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t("Professional Experience", "পেশাদার অভিজ্ঞতা")}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t(
                "Over 15 years of dedicated service in dental care",
                "দন্ত চিকিৎসায় ১৫ বছরেরও বেশি নিবেদিত সেবা"
              )}
            </p>
          </div>

          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h3 className="text-xl font-bold text-slate-900">
                    {exp.position}
                  </h3>
                  <span className="text-teal-600 font-medium">
                    {exp.period}
                  </span>
                </div>
                <p className="text-slate-700 font-medium mb-2">
                  {exp.organization}
                </p>
                <p className="text-slate-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-slate-900/40"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("Areas of Specialization", "বিশেষজ্ঞতার ক্ষেত্রগুলি")}
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t(
                "Expertise in various aspects of modern dentistry",
                "আধুনিক দন্ত চিকিৎসার বিভিন্ন দিকে দক্ষতা"
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {specializations.map((spec, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-3 border border-white/20"
              >
                <div className="bg-teal-500/20 p-2 rounded-lg border border-teal-500/30">
                  <Stethoscope className="h-5 w-5 text-teal-400" />
                </div>
                <span className="text-white font-medium">{spec}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t("Our Values", "আমাদের মূল্যবোধ")}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t(
                "Principles that guide our practice and patient care",
                "আমাদের অনুশীলন এবং রোগী যত্নকে পরিচালিত করে এমন নীতিগুলি"
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-slate-700" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 to-slate-900/50"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t(
              "Ready for Quality Dental Care?",
              "মানসম্পন্ন দন্ত চিকিৎসার জন্য প্রস্তুত?"
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
              {t("Book Your Appointment", "আপনার অ্যাপয়েন্টমেন্ট বুক করুন")}
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
