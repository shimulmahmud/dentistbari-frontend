import {
  Award,
  GraduationCap,
  Heart,
  BriefcaseIcon,
  Activity,
  Target,
  Sparkles,
  Users,
  Calendar,
  MapPin,
  Phone,
  CheckCircle,
  Clock,
  Shield,
  Star,
  Stethoscope,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

import heroImage from "../assets/images/image.png";

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const { t } = useLanguage();

  // --- ADD THIS LINE FOR ACCORDION FUNCTIONALITY ---
  // This state keeps track of which specialization accordion is open. `null` means all are closed.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
    {
      name: t("Prosthodontics", "প্রস্থেডন্টিক্স"),
      description: t(
        "The branch of dentistry that focuses on designing, fitting, and placing artificial replacements for teeth and other parts of the mouth.",
        "দন্তচিকিৎসার এমন একটি শাখা যা দাঁত এবং মুখের অন্যান্য অংশের কৃত্রিম প্রতিস্থাপন ডিজাইন, ফিটিং এবং স্থাপনের উপর দৃষ্টি নিবদ্ধ করে।"
      ),
    },
    {
      name: t("Implant Dentistry", "ইমপ্লান্ট ডেন্টিস্ট্রি"),
      description: t(
        "A revolutionary tooth replacement option that uses titanium posts surgically placed in the jawbone to serve as artificial roots.",
        "একটি বিপ্লবী দাঁত প্রতিস্থাপন বিকল্প যা আর্টিফিশিয়াল রুট হিসাবে কাজ করার জন্য জবড়ার হাড়ের মধ্যে শল্যচিকিৎসাভাবে স্থাপন করা টাইটানিয়াম পোস্ট ব্যবহার করে।"
      ),
    },
    {
      name: t("Cosmetic Dentistry", "সৌন্দর্যবর্ধক দন্ত চিকিৎসা"),
      description: t(
        "Focused on improving the appearance of your teeth, smile, and mouth through various dental procedures.",
        "বিভিন্ন দন্ত চিকিৎসা পদ্ধতির মাধ্যমে আপনার দাঁত, হাসি এবং মুখের উপস্থিতি উন্নত করার উপর মনোযোগ দেওয়া হয়।"
      ),
    },
    {
      name: t("Full Mouth Rehabilitation", "সম্পূর্ণ মুখ পুনর্বাসন"),
      description: t(
        "A comprehensive process of restoring the function, health, and aesthetics of all the teeth in both the upper and lower jaws.",
        "উভয় উপরের এবং নিচের চোয়ালে সমস্ত দাঁতের কার্যকারিতা, স্বাস্থ্য এবং নান্দনিকতা পুনরুদ্ধারের একটি বিস্তৃত প্রক্রিয়া।"
      ),
    },
    {
      name: t("Smile Makeover", "হাসি পুনর্গঠন"),
      description: t(
        "A customized treatment plan designed to improve the overall appearance of your smile through one or more cosmetic dentistry procedures.",
        "এক বা একাধিক সৌন্দর্যবর্ধক দন্ত চিকিৎসা পদ্ধতির মাধ্যমে আপনার হাসির সামগ্রিক উপস্থিতি উন্নত করার জন্য ডিজাইন করা একটি কাস্টমাইজড চিকিৎসা পরিকল্পনা।"
      ),
    },
  ];
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {/* Hero and About Combined Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-slate-900/50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <div className="inline-flex items-center px-4 py-2 mb-6 bg-teal-500/20 border border-teal-500/30 rounded-full text-sm font-medium text-teal-200 backdrop-blur-sm">
                <CheckCircle className="h-4 w-4 mr-2" />
                {t("15+ Years of Excellence", "১৫+ বছরের শ্রেষ্ঠত্ব")}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                {t("Dr. Md. Ripon Ali", "ডাঃ মোঃ রিপন আলী")}
              </h1>

              <p className="text-lg text-teal-300 font-medium mb-3">
                {t(
                  "Senior Prosthodontist & Implant Specialist",
                  "সিনিয়র প্রস্থেডন্টিস্ট ও ইমপ্লান্ট বিশেষজ্ঞ"
                )}
              </p>

              <p className="text-lg text-gray-300 leading-relaxed max-w-xl mb-6">
                {t(
                  "Dr. Ripon Ali is a highly skilled prosthodontist who graduated from the University of Dhaka with a BDS degree and later obtained his MDS in Prosthodontics. With over 15 years of experience, he provides advanced, patient-focused dental care with modern technology.",
                  "ডাঃ রিপন আলী একজন অত্যন্ত দক্ষ প্রস্থেডন্টিস্ট যিনি ঢাকা বিশ্ববিদ্যালয় থেকে বিডিএস ডিগ্রি নিয়ে স্নাতক হন এবং পরবর্তীতে প্রস্থেডন্টিক্সে এমডিএস অর্জন করেন। ১৫ বছরেরও বেশি অভিজ্ঞতার সাথে, তিনি আধুনিক প্রযুক্তির মাধ্যমে উন্নত ও রোগী-কেন্দ্রিক দন্ত চিকিৎসা প্রদান করেন।"
                )}
              </p>

              {/* Minimalist Inline Statistics */}
              <p className="text-sm text-gray-400 mb-6">
                <span className="font-semibold text-teal-300">15+</span>{" "}
                {t("Years", "বছর")} |
                <span className="font-semibold text-teal-300"> 5000+</span>{" "}
                {t("Patients", "রোগী")} |
                <span className="font-semibold text-teal-300"> 98%</span>{" "}
                {t("Success Rate", "সাফল্যের হার")} |
                <span className="font-semibold text-teal-300"> 12+</span>{" "}
                {t("Awards", "পুরস্কার")}
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate("book-appointment")}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-7 py-3 rounded-full font-semibold transition shadow-lg"
                >
                  {t("Book Appointment", "অ্যাপয়েন্টমেন্ট বুক করুন")}
                </button>

                <button
                  onClick={() => onNavigate("contact")}
                  className="border border-white/30 px-7 py-3 rounded-full font-semibold text-white hover:bg-white/10 transition"
                >
                  {t("Contact Clinic", "ক্লিনিকে যোগাযোগ করুন")}
                </button>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-teal-500/10 rounded-3xl blur-2xl" />
              <img
                src={heroImage}
                alt="Dr. Md. Ripon Ali"
                className="relative rounded-3xl shadow-2xl w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Education Section - Refined Professional Design */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-slate-900/40"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("Education & Credentials", "শিক্ষা ও যোগ্যতা")}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-teal-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t(
                "A foundation of excellence built upon rigorous education and specialized training.",
                "কঠোর শিক্ষা এবং বিশেষায়িত প্রশিক্ষণের উপর প্রতিষ্ঠিত শ্রেষ্ঠত্বের ভিত্তি।"
              )}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {education.map((edu, index) => (
              <div
                key={index}
                className="relative flex items-start pl-20 group transition-all duration-300"
              >
                {/* Numbered Circle */}
                <div className="absolute left-0 top-0 flex items-center justify-center w-14 h-14 border-2 border-amber-400/30 rounded-full">
                  <span className="text-2xl font-bold text-amber-400/80 group-hover:text-amber-300 transition-colors duration-300">
                    0{index + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-base text-gray-300 mb-1">
                    {edu.institution}
                  </p>
                  <p className="text-sm font-semibold text-amber-400/90 mb-3">
                    {edu.year}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {edu.description}
                  </p>
                </div>

                {/* Elegant Separator */}
                {index < education.length - 1 && (
                  <div className="absolute bottom-0 left-20 right-0 h-px bg-gradient-to-r from-slate-600 via-amber-400/20 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section - Refined Professional List Design */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        {/* Background Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-slate-900/40"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("Professional Experience", "পেশাদার অভিজ্ঞতা")}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-teal-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t(
                "A journey of professional growth and dedicated service in dental care.",
                "দন্ত চিকিৎসায় পেশাগত প্রবৃদ্ধি এবং নিবেদিত সেবার একটি যাত্রা।"
              )}
            </p>
          </div>

          {/* Experience List */}
          <div className="max-w-4xl mx-auto">
            {experience.map((exp, index) => (
              <div
                key={index}
                className="relative flex items-start pl-20 pb-10 group hover:bg-white/5 -mx-4 px-4 rounded-lg transition-all duration-300"
              >
                {/* Professional Icon Marker */}
                <div className="absolute left-0 top-1 flex items-center justify-center w-12 h-12 border-2 border-amber-400/50 rounded-full bg-slate-800">
                  <Stethoscope className="h-6 w-6 text-amber-400" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {exp.position}
                  </h3>
                  <p className="text-base text-amber-400/90 font-semibold mb-2">
                    {exp.organization}
                  </p>
                  <p className="text-sm text-gray-400 mb-3">{exp.period}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                {/* Elegant Separator */}
                {index < experience.length - 1 && (
                  <div className="absolute bottom-0 left-20 right-0 h-px bg-gradient-to-r from-slate-600 via-amber-400/20 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations Section - Accordion Design */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-slate-900/40"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("Areas of Specialization", "বিশেষজ্ঞতার ক্ষেত্রগুলি")}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-teal-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t(
                "Expertise in various aspects of modern dentistry",
                "আধুনিক দন্ত চিকিৎসার বিভিন্ন দিকে দক্ষতা"
              )}
            </p>
          </div>

          {/* Accordion Container */}
          <div className="space-y-4">
            {specializations.map((spec, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden"
                >
                  {/* Accordion Header (Clickable) */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-white/10 transition-colors duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-teal-500/10 p-2 rounded-lg">
                        <Activity className="h-5 w-5 text-teal-400" />
                      </div>
                      <span className="text-white font-medium text-lg">
                        {spec.name}
                      </span>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Accordion Body (Collapsible) */}
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-4 pt-0 text-gray-300 border-t border-white/5">
                        {spec.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section - Redesigned */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-slate-900/40"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("Our Values", "আমাদের মূল্যবোধ")}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-teal-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t(
                "Principles that guide our practice and patient care",
                "আমাদের অনুশীলন এবং রোগী যত্নকে পরিচালিত করে এমন নীতিগুলি"
              )}
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-lg border-l-4 border-amber-400/50 bg-white/5 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="bg-amber-500/10 p-2 rounded-lg">
                  <value.icon className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {value.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
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
