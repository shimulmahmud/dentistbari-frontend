import { Activity } from "lucide-react";
import servicesData from "../../data/dummy-data.json";

interface BookingHeaderProps {
  t: (key: string, fallback?: string) => string;
  selectedService: string | null;
}

export const BookingHeader = ({ t, selectedService }: BookingHeaderProps) => {
  // Find the service with the selected slug
  const service = selectedService
    ? servicesData.services.find((s) => s.slug === selectedService)
    : null;

  return (
    <div className="text-center mb-10">
      <div className="inline-flex items-center px-4 py-2 bg-teal-500/20 border border-teal-500/30 rounded-full text-sm font-medium text-teal-200 backdrop-blur-sm mb-6">
        <Activity className="h-4 w-4 mr-2" />
        {t("Book Your Appointment", "আপনার অ্যাপয়েন্টমেন্ট বুক করুন")}
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        {service
          ? t(service.title, service.title_bn)
          : t("Schedule Your Visit", "আপনার সফর নির্ধারণ করুন")}
      </h1>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto">
        {service
          ? t(service.short_description, service.short_description_bn)
          : t(
              "Take first step towards a healthier smile",
              "একটি স্বাস্থ্যকর হাসির প্রথম পদক্ষেপ নিন"
            )}
      </p>
    </div>
  );
};
