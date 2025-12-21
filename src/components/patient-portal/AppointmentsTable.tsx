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

interface AppointmentsTableProps {
  appointments: Appointment[];
  t: (key: string, fallback?: string) => string;
}

export const AppointmentsTable = ({
  appointments,
  t,
}: AppointmentsTableProps) => (
  <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {t("Date & Time", "তারিখ ও সময়")}
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {t("Doctor", "ডাক্তার")}
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {t("Status", "স্ট্যাটাস")}
          </th>
          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {appointments.map((appointment) => (
          <tr
            key={appointment.id}
            className="hover:bg-gray-50 transition-colors"
          >
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">
                {new Date(appointment.appointment_date).toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-500">
                {appointment.appointment_time}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">
                {appointment.doctor_name}
              </div>
              <div className="text-sm text-gray-500">
                {appointment.specialization}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  appointment.status === "confirmed"
                    ? "bg-green-100 text-green-800"
                    : appointment.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {appointment.status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button className="text-blue-600 hover:text-blue-900 mr-4 transition-colors">
                {t("View", "দেখুন")}
              </button>
              <button className="text-red-600 hover:text-red-900 transition-colors">
                {t("Cancel", "বাতিল")}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
