import React, { useEffect, useMemo, useState } from "react";
import { db, Appointment } from "../../lib/database";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setAppointments(db.getAllAppointments());
  }, []);

  const q = search.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      appointments.filter(
        (a) =>
          !q ||
          a.patient_name.toLowerCase().includes(q) ||
          a.patient_email.toLowerCase().includes(q) ||
          (a.service_id || "").toLowerCase().includes(q)
      ),
    [appointments, q]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);
  const pageItems = filtered.slice(
    (page - 1) * pageSize,
    (page - 1) * pageSize + pageSize
  );

  const updateStatus = (id: string, status: Appointment["status"]) => {
    db.updateAppointment(id, { status });
    setAppointments(db.getAllAppointments());
  };
  const remove = (id: string) => {
    if (!confirm("Delete appointment?")) return;
    db.deleteAppointment(id);
    setAppointments(db.getAllAppointments());
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Appointments</h2>
        <div className="flex items-center space-x-2">
          <input
            placeholder="Search by patient, email or service"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="input"
          />
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="input w-28"
          >
            <option value={5}>5 / page</option>
            <option value={10}>10 / page</option>
            <option value={25}>25 / page</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded shadow overflow-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">Patient</th>
              <th className="p-2">Service</th>
              <th className="p-2">Date</th>
              <th className="p-2">Time</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="p-2">
                  {a.patient_name}{" "}
                  <div className="text-xs text-gray-500">{a.patient_email}</div>
                </td>
                <td className="p-2 text-center">{a.service_id || "—"}</td>
                <td className="p-2 text-center">{a.appointment_date}</td>
                <td className="p-2 text-center">{a.appointment_time}</td>
                <td className="p-2 text-center">
                  <select
                    value={a.status}
                    onChange={(e) => updateStatus(a.id, e.target.value as any)}
                    className="input"
                  >
                    <option value="pending">pending</option>
                    <option value="confirmed">confirmed</option>
                    <option value="cancelled">cancelled</option>
                    <option value="completed">completed</option>
                  </select>
                </td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => remove(a.id)}
                    className="btn btn-sm text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-3 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Page {page} of {totalPages} — {filtered.length} appointments
          </div>
          <div className="space-x-2 flex items-center">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="btn btn-sm"
            >
              Prev
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="btn btn-sm"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
