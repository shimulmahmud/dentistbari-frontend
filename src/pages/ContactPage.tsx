import { useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save messages locally instead of sending to a DB
      await new Promise((r) => setTimeout(r, 250));
      const existing = JSON.parse(
        localStorage.getItem("contact_messages") || "[]"
      );
      existing.push({
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        created_at: new Date().toISOString(),
      });
      localStorage.setItem("contact_messages", JSON.stringify(existing));
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error("Contact message error:", error);
      alert(t("Failed to send message", "বার্তা পাঠাতে ব্যর্থ"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Background Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-slate-900/40"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("Contact Us", "আমাদের সাথে যোগাযোগ করুন")}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-teal-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {t(
              "We look forward to hearing from you and answering any questions you may have.",
              "আমরা আপনার কাছ থেকে শুনতে এবং আপনার যেকোনো প্রশ্নের উত্তর দিতে উন্মুখ হচ্ছি।"
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form Card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">
              {t("Send us a Message", "আমাদের একটি বার্তা পাঠান")}
            </h2>

            {submitted && (
              <div className="bg-green-500/20 border border-green-400/50 rounded-lg p-4 mb-6 flex items-start">
                <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                <p className="text-green-300">
                  {t(
                    "Thank you for your message! We will get back to you soon.",
                    "আপনার বার্তার জন্য ধন্যবাদ! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।"
                  )}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder={t("Your Name", "আপনার নাম")}
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 bg-slate-800/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:bg-slate-800/70 focus:border-amber-400 transition-all duration-300"
              />
              <input
                type="email"
                placeholder={t("Your Email", "আপনার ইমেইল")}
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 bg-slate-800/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:bg-slate-800/70 focus:border-amber-400 transition-all duration-300"
              />
              <input
                type="tel"
                placeholder={t("Phone", "ফোন")}
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-2 bg-slate-800/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:bg-slate-800/70 focus:border-amber-400 transition-all duration-300"
              />
              <input
                type="text"
                placeholder={t("Subject", "বিষয়")}
                required
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full px-4 py-2 bg-slate-800/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:bg-slate-800/70 focus:border-amber-400 transition-all duration-300"
              />
              <textarea
                placeholder={t("Message", "বার্তা")}
                rows={4}
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-2 bg-slate-800/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:bg-slate-800/70 focus:border-amber-400 transition-all duration-300"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-full font-semibold transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50"
              >
                <Send className="inline h-5 w-5 mr-2" />
                {loading
                  ? t("Sending...", "পাঠানো হচ্ছে...")
                  : t("Send Message", "বার্তা পাঠান")}
              </button>
            </form>
          </div>

          {/* Contact Information Card */}
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-6">
                {t("Contact Information", "যোগাযোগের তথ্য")}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-teal-500/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      {t("Phone", "ফোন")}
                    </h3>
                    <a
                      href="tel:+8801234567890"
                      className="text-gray-300 hover:text-teal-400 transition-colors"
                    >
                      +880 1234-567890
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-teal-500/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      {t("Email", "ইমেইল")}
                    </h3>
                    <a
                      href="mailto:info@dentistbari.com"
                      className="text-gray-300 hover:text-teal-400 transition-colors"
                    >
                      info@dentistbari.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-teal-500/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      {t("Location", "অবস্থান")}
                    </h3>
                    <p className="text-gray-300">
                      {t(
                        "Dhanmondi, Dhaka, Bangladesh",
                        "ধানমন্ডি, ঢাকা, বাংলাদেশ"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
