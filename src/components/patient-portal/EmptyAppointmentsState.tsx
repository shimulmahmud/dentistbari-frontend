import { Calendar, Plus } from "lucide-react";

interface EmptyAppointmentsStateProps {
  t: (key: string, fallback?: string) => string;
  onNavigate: (page: string) => void;
}

export const EmptyAppointmentsState = ({
  t,
  onNavigate,
}: EmptyAppointmentsStateProps) => (
  <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
    <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-4">
      <Calendar className="h-12 w-12 text-blue-300" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">
      {t("No appointments yet", "এখনো কোন অ্যাপয়েন্টমেন্ট নেই")}
    </h3>
    <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto mb-6">
      {t(
        "You don't have any upcoming appointments. Book your first appointment to get started.",
        "আপনার কোন আসন্ন অ্যাপয়েন্টমেন্ট নেই। শুরু করতে এখনই একটি অ্যাপয়েন্টমেন্ট বুক করুন।"
      )}
    </p>
    <button
      onClick={() => onNavigate("book-appointment")}
      className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
    >
      <Plus className="h-4 w-4 mr-2" />
      {t("Book Appointment", "অ্যাপয়েন্টমেন্ট বুক করুন")}
    </button>
  </div>
);
