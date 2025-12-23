import { Pill, Heart, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useToast } from "../../contexts/ToastContext";

interface HealthReminder {
  id: string;
  type: "medication" | "followup" | "tip" | "urgent";
  title: string;
  description: string;
  dueDate?: string;
  status?: "pending" | "completed";
}

interface HealthRemindersProps {
  t: (key: string, fallback?: string) => string;
}

export const HealthReminders = ({ t }: HealthRemindersProps) => {
  const reminders: HealthReminder[] = [
    {
      id: "1",
      type: "medication",
      title: t("Take Antibiotics", "অ্যান্টিবায়োটিক নিন"),
      description: t("Twice daily after meals", "দিনে দুইবার খাবারের পরে"),
      dueDate: "Today",
      status: "pending",
    },
    {
      id: "2",
      type: "followup",
      title: t("Follow-up Appointment", "ফলো-আপ অ্যাপয়েন্টমেন্ট"),
      description: t(
        "Schedule within 2 weeks",
        "২ সপ্তাহের মধ্যে নির্ধারণ করুন"
      ),
      dueDate: "Dec 30",
      status: "pending",
    },
    {
      id: "3",
      type: "tip",
      title: t("Rinse with Salt Water", "লবণ জল দিয়ে কুলি করুন"),
      description: t(
        "3 times daily for faster healing",
        "দ্রুত নিরাময়ের জন্য দিনে ৩ বার"
      ),
      status: "completed",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "medication":
        return <Pill className="h-5 w-5" />;
      case "followup":
        return <Clock className="h-5 w-5" />;
      case "tip":
        return <Heart className="h-5 w-5" />;
      case "urgent":
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <CheckCircle className="h-5 w-5" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "medication":
        return { bg: "bg-red-50", text: "text-red-600", icon: "text-red-600" };
      case "followup":
        return {
          bg: "bg-orange-50",
          text: "text-orange-600",
          icon: "text-orange-600",
        };
      case "tip":
        return {
          bg: "bg-green-50",
          text: "text-green-600",
          icon: "text-green-600",
        };
      case "urgent":
        return { bg: "bg-red-50", text: "text-red-600", icon: "text-red-600" };
      default:
        return {
          bg: "bg-blue-50",
          text: "text-blue-600",
          icon: "text-blue-600",
        };
    }
  };

  const { showToast } = useToast();

  const handleMarkDone = (id: string) => {
    // In a real app you'd update backend/state; here we just show a toast
    showToast(
      t("Reminder marked done", "রিমাইন্ডার সম্পন্ন করা হয়েছে"),
      "success"
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900">
          {t("Health Reminders", "স্বাস্থ্য স্মৃতি")}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {t("Stay on top of your dental care", "আপনার দাঁতের যত্ন সঠিক রাখুন")}
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {reminders.map((reminder) => {
          const colors = getColor(reminder.type);
          return (
            <div
              key={reminder.id}
              className={`p-6 hover:bg-gray-50 transition-colors ${
                reminder.status === "completed" ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`${colors.bg} rounded-lg p-3 flex-shrink-0`}>
                  <div className={colors.icon}>{getIcon(reminder.type)}</div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className={`text-sm font-semibold ${colors.text}`}>
                        {reminder.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {reminder.description}
                      </p>
                    </div>

                    {reminder.status === "completed" && (
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    )}
                  </div>

                  {/* Due Date */}
                  {reminder.dueDate && reminder.status !== "completed" && (
                    <div className="mt-3 flex items-center text-xs text-gray-500">
                      <Clock className="h-4 w-4 mr-1.5" />
                      {reminder.dueDate}
                    </div>
                  )}
                </div>

                {/* Action Button */}
                {reminder.status !== "completed" && (
                  <button
                    onClick={() => handleMarkDone(reminder.id)}
                    className="flex-shrink-0 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    {t("Mark Done", "সম্পন্ন")}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
