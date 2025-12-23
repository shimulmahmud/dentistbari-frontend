import React, { useEffect, useState } from "react";
import { db } from "../../lib/database";

export default function AdminDashboard({
  onNavigate,
}: {
  onNavigate?: (p: string) => void;
}) {
  const [usersCount, setUsersCount] = useState(0);
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);

  useEffect(() => {
    setUsersCount(db.getAllUsers().length);
    setAppointmentsCount(db.getAllAppointments().length);
    setServicesCount(db.getAllServices().length);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Users</div>
          <div className="text-3xl font-bold">{usersCount}</div>
          <button
            onClick={() => onNavigate && onNavigate("/admin/users")}
            className="mt-3 text-sm text-blue-600"
          >
            Manage users
          </button>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Appointments</div>
          <div className="text-3xl font-bold">{appointmentsCount}</div>
          <button
            onClick={() => onNavigate && onNavigate("/admin/appointments")}
            className="mt-3 text-sm text-blue-600"
          >
            Manage appointments
          </button>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Services</div>
          <div className="text-3xl font-bold">{servicesCount}</div>
          <button
            onClick={() => onNavigate && onNavigate("/admin/services")}
            className="mt-3 text-sm text-blue-600"
          >
            Manage services
          </button>
        </div>
      </div>
    </div>
  );
}
