import { Pill } from "lucide-react";

interface PrescriptionsViewProps {
  t: (key: string, fallback?: string) => string;
}

export const PrescriptionsView = ({ t }: PrescriptionsViewProps) => (
  <div className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden p-8">
    <div className="text-center py-12">
      <Pill className="h-16 w-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {t("Prescriptions", "প্রেসক্রিপশন")}
      </h3>
      <p className="text-sm text-gray-500 max-w-md mx-auto">
        {t(
          "Your prescriptions will appear here once they are added by your healthcare provider.",
          "আপনার প্রেসক্রিপশন এখানে প্রদর্শিত হবে যখন আপনার স্বাস্থ্যসেবা প্রদানকারী তা যোগ করবেন।"
        )}
      </p>
    </div>
  </div>
);
