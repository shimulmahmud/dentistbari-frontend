import React, { useState, useEffect, useMemo } from "react";
import { db, Appointment } from "../../lib/database";
import {
  format,
  startOfDay,
  endOfDay,
  parseISO,
  isToday,
  isTomorrow,
} from "date-fns";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiSearch,
  FiFilter,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiCheck,
  FiXCircle,
  FiClock as FiClockIcon,
  FiChevronDown,
  FiChevronUp,
  FiEdit2,
  FiTrash2,
  FiRefreshCw,
} from "react-icons/fi";

type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

interface AppointmentFilters {
  status: AppointmentStatus | "";
  dateFrom: string;
  dateTo: string;
  search: string;
  doctorId: string;
}

const NewAppointmentsPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [currentDate, setCurrentDate] = useState(new Date());

  const [filters, setFilters] = useState<AppointmentFilters>({
    status: "",
    dateFrom: format(new Date(), "yyyy-MM-dd"),
    dateTo: format(new Date(), "yyyy-MM-dd"),
    search: "",
    doctorId: "",
  });

  // Load appointments
  useEffect(() => {
    const loadAppointments = () => {
      try {
        setLoading(true);
        const allAppointments = db.getAllAppointments();
        setAppointments(allAppointments);
      } catch (error) {
        console.error("Error loading appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  // Apply filters
  const filteredAppointments = useMemo(() => {
    return appointments.filter((appt) => {
      // Filter by status
      if (filters.status && appt.status !== filters.status) return false;

      // Filter by date range
      const appointmentDate = new Date(appt.appointment_date);
      if (filters.dateFrom && new Date(filters.dateFrom) > appointmentDate)
        return false;
      if (filters.dateTo) {
        const toDate = new Date(filters.dateTo);
        toDate.setHours(23, 59, 59, 999);
        if (toDate < appointmentDate) return false;
      }

      // Filter by search term
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        if (
          !appt.patient_name.toLowerCase().includes(searchTerm) &&
          !appt.patient_email.toLowerCase().includes(searchTerm) &&
          !appt.patient_phone?.toLowerCase().includes(searchTerm)
        ) {
          return false;
        }
      }

      // Filter by doctor
      if (filters.doctorId && appt.doctor_id !== filters.doctorId) return false;

      return true;
    });
  }, [appointments, filters]);

  // Group appointments by date
  const appointmentsByDate = useMemo(() => {
    const groups: Record<string, Appointment[]> = {};

    filteredAppointments.forEach((appt) => {
      const dateStr = format(new Date(appt.appointment_date), "yyyy-MM-dd");
      if (!groups[dateStr]) {
        groups[dateStr] = [];
      }
      groups[dateStr].push(appt);
    });

    // Sort dates in ascending order
    return Object.entries(groups)
      .sort(
        ([dateA], [dateB]) =>
          new Date(dateA).getTime() - new Date(dateB).getTime()
      )
      .map(([date, apps]) => ({
        date,
        appointments: apps.sort(
          (a, b) =>
            new Date(a.appointment_date).getTime() -
            new Date(b.appointment_date).getTime()
        ),
      }));
  }, [filteredAppointments]);

  // Handle status update
  const updateStatus = (id: string, status: AppointmentStatus) => {
    try {
      db.updateAppointment(id, { status });
      setAppointments(db.getAllAppointments());
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  // Handle delete
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        db.deleteAppointment(id);
        setAppointments(db.getAllAppointments());
      } catch (error) {
        console.error("Error deleting appointment:", error);
      }
    }
  };

  // Format date for display
  const formatDisplayDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "EEEE, MMMM d, yyyy");
  };

  // Get status badge color
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <div className="relative">
            <button
              onClick={() =>
                setViewMode(viewMode === "list" ? "calendar" : "list")
              }
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {viewMode === "list" ? (
                <>
                  <FiCalendar className="mr-2" />
                  Calendar View
                </>
              ) : (
                <>
                  <FiList className="mr-2" />
                  List View
                </>
              )}
            </button>
          </div>
          <button
            onClick={() => {}}
            className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FiPlus className="mr-2" />
            New Appointment
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
          onClick={() => setShowFilters(!showFilters)}
        >
          <div className="flex items-center">
            <FiFilter className="text-gray-500 mr-2" />
            <span className="font-medium text-gray-700">Filters</span>
          </div>
          {showFilters ? <FiChevronUp /> : <FiChevronDown />}
        </div>

        {showFilters && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      status: e.target.value as AppointmentStatus,
                    })
                  }
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From
                </label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) =>
                    setFilters({ ...filters, dateFrom: e.target.value })
                  }
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To
                </label>
                <input
                  type="date"
                  value={filters.dateTo}
                  min={filters.dateFrom}
                  onChange={(e) =>
                    setFilters({ ...filters, dateTo: e.target.value })
                  }
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search patients..."
                    value={filters.search}
                    onChange={(e) =>
                      setFilters({ ...filters, search: e.target.value })
                    }
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setFilters({
                    status: "",
                    dateFrom: format(new Date(), "yyyy-MM-dd"),
                    dateTo: format(new Date(), "yyyy-MM-dd"),
                    search: "",
                    doctorId: "",
                  });
                }}
                className="text-sm text-gray-600 hover:text-gray-800 mr-4"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Appointments List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : appointmentsByDate.length > 0 ? (
        <div className="space-y-6">
          {appointmentsByDate.map(({ date, appointments }) => (
            <div
              key={date}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  {formatDisplayDate(date)}
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    {appointments.length}{" "}
                    {appointments.length === 1 ? "appointment" : "appointments"}
                  </span>
                </h3>
              </div>

              <div className="divide-y divide-gray-200">
                {appointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="p-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                    onClick={() => setSelectedAppointment(appt)}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-1">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 text-indigo-600">
                          <FiClockIcon className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-medium text-gray-900">
                            {appt.patient_name}
                            <span className="ml-2 text-sm text-gray-500">
                              {format(
                                new Date(appt.appointment_date),
                                "h:mm a"
                              )}
                            </span>
                          </h4>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                                appt.status
                              )}`}
                            >
                              {appt.status.charAt(0).toUpperCase() +
                                appt.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          {appt.service_name || "General Checkup"}
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <FiUser className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {appt.doctor_name || "Dr. Smith"}
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0 flex">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(appt.id);
                          }}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
          <FiCalendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No appointments
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {filters.status ||
            filters.search ||
            filters.dateFrom !== format(new Date(), "yyyy-MM-dd") ||
            filters.dateTo !== format(new Date(), "yyyy-MM-dd")
              ? "No appointments match your current filters."
              : "Get started by creating a new appointment."}
          </p>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FiPlus className="-ml-1 mr-2 h-5 w-5" />
              New Appointment
            </button>
          </div>
        </div>
      )}

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Appointment Details
                      </h3>
                      <button
                        onClick={() => setSelectedAppointment(null)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <FiX className="h-6 w-6" />
                      </button>
                    </div>

                    <div className="mt-4 space-y-4">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">
                          {selectedAppointment.patient_name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {selectedAppointment.patient_email}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Date & Time
                          </p>
                          <p className="mt-1 text-sm text-gray-900">
                            {format(
                              new Date(selectedAppointment.appointment_date),
                              "EEEE, MMMM d, yyyy"
                            )}
                            <br />
                            {format(
                              new Date(selectedAppointment.appointment_date),
                              "h:mm a"
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Status
                          </p>
                          <p className="mt-1">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                                selectedAppointment.status
                              )}`}
                            >
                              {selectedAppointment.status
                                .charAt(0)
                                .toUpperCase() +
                                selectedAppointment.status.slice(1)}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-sm font-medium text-gray-500">
                          Service
                        </p>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedAppointment.service_name ||
                            "General Checkup"}
                        </p>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-sm font-medium text-gray-500">
                          Doctor
                        </p>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedAppointment.doctor_name || "Dr. Smith"}
                        </p>
                      </div>

                      {selectedAppointment.notes && (
                        <div className="border-t border-gray-200 pt-4">
                          <p className="text-sm font-medium text-gray-500">
                            Notes
                          </p>
                          <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">
                            {selectedAppointment.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    // Handle edit action
                    setSelectedAppointment(null);
                  }}
                >
                  Edit Appointment
                </button>

                {selectedAppointment.status !== "cancelled" && (
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      updateStatus(selectedAppointment.id, "cancelled");
                      setSelectedAppointment(null);
                    }}
                  >
                    Cancel Appointment
                  </button>
                )}

                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setSelectedAppointment(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewAppointmentsPage;
