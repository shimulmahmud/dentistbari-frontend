import { Plus } from "lucide-react";
import { EmptyAppointmentsState } from "./EmptyAppointmentsState";
import { AppointmentsTable } from "./AppointmentsTable";

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

interface AppointmentsViewProps {
  t: (key: string, fallback?: string) => string;
  onNavigate: (page: string) => void;
  appointments: Appointment[];
}

export const AppointmentsView = ({
  t,
  onNavigate,
  appointments,
}: AppointmentsViewProps) => (
  <div className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden">
    <div className="px-8 py-6 border-b border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {t("Your Appointments", "আপনার অ্যাপয়েন্টমেন্টসমূহ")}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {t(
              "View and manage your appointments",
              "আপনার অ্যাপয়েন্টমেন্ট দেখুন এবং পরিচালনা করুন"
            )}
          </p>
        </div>
        <button
          onClick={() => onNavigate("book-appointment")}
          className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t("New Appointment", "নতুন অ্যাপয়েন্টমেন্ট")}
        </button>
      </div>
    </div>

    <div className="px-6 sm:px-8 pb-8">
      {appointments.length === 0 ? (
        <EmptyAppointmentsState t={t} onNavigate={onNavigate} />
      ) : (
        <AppointmentsTable appointments={appointments} t={t} />
      )}
    </div>
  </div>
);
