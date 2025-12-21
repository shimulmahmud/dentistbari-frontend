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
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("Contact Us", "আমাদের সাথে যোগাযোগ করুন")}
          </h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t("Get in Touch", "আমাদের সাথে যোগাযোগ করুন")}
              </h2>

              {submitted && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                  <p className="text-green-800">
                    {t(
                      "Thank you for your message!",
                      "আপনার বার্তার জন্য ধন্যবাদ!"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder={t("Your Email", "আপনার ইমেইল")}
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  placeholder={t("Phone", "ফোন")}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder={t("Subject", "বিষয়")}
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder={t("Message", "বার্তা")}
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white py-2 rounded-full hover:from-blue-700 hover:to-teal-600 transition font-semibold disabled:opacity-50"
                >
                  <Send className="inline h-5 w-5 mr-2" />
                  {loading
                    ? t("Sending...", "পাঠানো হচ্ছে...")
                    : t("Send Message", "বার্তা পাঠান")}
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {t("Phone", "ফোন")}
                  </h3>
                  <a
                    href="tel:+8801234567890"
                    className="text-blue-600 hover:underline"
                  >
                    +880 1234-567890
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {t("Email", "ইমেইল")}
                  </h3>
                  <a
                    href="mailto:info@dentistbari.com"
                    className="text-blue-600 hover:underline"
                  >
                    info@dentistbari.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {t("Location", "অবস্থান")}
                  </h3>
                  <p className="text-gray-600">
                    {t("Dhaka, Bangladesh", "ঢাকা, বাংলাদেশ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
