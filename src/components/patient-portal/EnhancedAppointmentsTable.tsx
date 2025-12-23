import { useState } from "react";
import { Calendar, Clock, X, AlertCircle } from "lucide-react";

interface Appointment {
  id: string;
  patient_name: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  doctor_name?: string;
  specialization?: string;
  type?: string;
  notes?: string;
}

interface EnhancedAppointmentsTableProps {
  appointments: Appointment[];
  t: (key: string, fallback?: string) => string;
}

export const EnhancedAppointmentsTable = ({
  appointments,
  t,
}: EnhancedAppointmentsTableProps) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return {
          bg: "bg-green-50",
          text: "text-green-700",
          label: "Confirmed",
        };
      case "pending":
        return {
          bg: "bg-yellow-50",
          text: "text-yellow-700",
          label: "Pending",
        };
      case "cancelled":
        return { bg: "bg-red-50", text: "text-red-700", label: "Cancelled" };
      case "completed":
        return { bg: "bg-blue-50", text: "text-blue-700", label: "Completed" };
      default:
        return { bg: "bg-gray-50", text: "text-gray-700", label: "Unknown" };
    }
  };

  const handleCancelAppointment = () => {
    setShowCancelModal(false);
    setCancelReason("");
    // API call would go here
  };

  return (
    <>
      <div className="grid gap-4">
        {appointments.map((appointment) => {
          const statusColor = getStatusColor(appointment.status);
          const appointmentDate = new Date(appointment.appointment_date);
          const formattedDate = appointmentDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          return (
            <div
              key={appointment.id}
              className="bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  {/* Left Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {appointment.type ||
                            t("General Checkup", "সাধারণ পরীক্ষা")}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {appointment.doctor_name || "Dr. Bari"} -{" "}
                          {appointment.specialization || "Dentist"}
                        </p>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          {t("Date", "তারিখ")}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-gray-900">
                          {formattedDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          {t("Time", "সময়")}
                        </p>
                        <div className="mt-1 flex items-center gap-1 text-sm font-semibold text-gray-900">
                          <Clock className="h-4 w-4 text-blue-600" />
                          {appointment.appointment_time}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          {t("Status", "অবস্থা")}
                        </p>
                        <span
                          className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${statusColor.bg} ${statusColor.text}`}
                        >
                          {t(statusColor.label, statusColor.label)}
                        </span>
                      </div>
                    </div>

                    {/* Notes */}
                    {appointment.notes && (
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <span className="font-semibold">
                            {t("Notes", "নোট")}:
                          </span>{" "}
                          {appointment.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    {appointment.status !== "cancelled" &&
                      appointment.status !== "completed" && (
                        <>
                          <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            {t("Reschedule", "পুনঃনির্ধারণ করুন")}
                          </button>
                          <button
                            onClick={() => {
                              setShowCancelModal(true);
                            }}
                            className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            {t("Cancel", "বাতিল করুন")}
                          </button>
                        </>
                      )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-50 to-red-100 px-6 py-4 border-b border-red-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-red-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  {t("Cancel Appointment", "অ্যাপয়েন্টমেন্ট বাতিল করুন")}
                </h2>
              </div>
              <button
                onClick={() => setShowCancelModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                {t(
                  "Are you sure you want to cancel this appointment? This action cannot be undone.",
                  "আপনি কি এই অ্যাপয়েন্টমেন্টটি বাতিল করতে নিশ্চিত? এই পদক্ষেপ পূর্বাবস্থায় আনা যাবে না।"
                )}
              </p>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t(
                  "Reason for cancellation (optional)",
                  "বাতিলের কারণ (ঐচ্ছিক)"
                )}
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder={t(
                  "Tell us why you're cancelling...",
                  "বলুন কেন আপনি বাতিল করছেন..."
                )}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t("Keep Appointment", "অ্যাপয়েন্টমেন্ট রাখুন")}
              </button>
              <button
                onClick={handleCancelAppointment}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                {t("Confirm Cancellation", "বাতিল নিশ্চিত করুন")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
