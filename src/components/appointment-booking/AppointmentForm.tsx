import { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { TimeDropdown } from "./TimeDropdown";
import { FormError } from "./FormError";

interface AppointmentFormProps {
  formData: {
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    appointmentDate: string;
    appointmentTime: string;
    notes: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  formError: string;
  loading: boolean;
  timeSlots: string[];
  onSubmit: (e: React.FormEvent) => void;
  t: (key: string, fallback?: string) => string;
}

export const AppointmentForm = ({
  formData,
  setFormData,
  formError,
  loading,
  timeSlots,
  onSubmit,
  t,
}: AppointmentFormProps) => (
  <div className="lg:col-span-2">
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6">
        {t("Appointment Details", "অ্যাপয়েন্টমেন্টের বিবরণ")}
      </h2>

      {formError && <FormError message={formError} t={t} />}

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
              <User className="inline h-4 w-4 mr-2 text-teal-400" />
              {t("Full Name", "পুরো নাম")}
            </label>
            <input
              type="text"
              required
              value={formData.patientName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  patientName: e.target.value,
                })
              }
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
              <Mail className="inline h-4 w-4 mr-2 text-teal-400" />
              {t("Email", "ইমেল")}
            </label>
            <input
              type="email"
              required
              value={formData.patientEmail}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  patientEmail: e.target.value,
                })
              }
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-white placeholder-gray-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
            <Phone className="inline h-4 w-4 mr-2 text-teal-400" />
            {t("Phone", "ফোন")}
          </label>
          <input
            type="tel"
            required
            value={formData.patientPhone}
            onChange={(e) =>
              setFormData({ ...formData, patientPhone: e.target.value })
            }
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-white placeholder-gray-400"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
              <Calendar className="inline h-4 w-4 mr-2 text-teal-400" />
              {t("Date", "তারিখ")}
            </label>
            <input
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              value={formData.appointmentDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  appointmentDate: e.target.value,
                })
              }
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
              <Clock className="inline h-4 w-4 mr-2 text-teal-400" />
              {t("Time", "সময়")}
            </label>
            <TimeDropdown
              value={formData.appointmentTime}
              onChange={(value) =>
                setFormData({ ...formData, appointmentTime: value })
              }
              timeSlots={timeSlots}
              t={t}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {t("Notes", "নোট")}
          </label>
          <textarea
            rows={4}
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-white placeholder-gray-400 resize-none"
            placeholder={t(
              "Any additional information...",
              "যেকোনো অতিরিক্ত তথ্য..."
            )}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !formData.appointmentTime}
          className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
        >
          {loading
            ? t("Booking...", "বুক করা হচ্ছে...")
            : t("Book Appointment", "অ্যাপয়েন্টমেন্ট বুক করুন")}
        </button>
      </form>
    </div>
  </div>
);