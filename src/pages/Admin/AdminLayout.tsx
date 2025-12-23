import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import AdminDashboard from "./AdminDashboard";
import UsersPage from "./UsersPage";
import AppointmentsPage from "./AppointmentsPage";
import ServicesPage from "./ServicesPage";

export default function AdminLayout({
  currentSub,
  onNavigate,
}: {
  currentSub?: string | undefined;
  onNavigate?: (p: string) => void;
}) {
  const { user, loading, isAdmin } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        onNavigate && onNavigate("login");
      } else if (!isAdmin || !isAdmin()) {
        onNavigate && onNavigate("home");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user]);

  const renderContent = () => {
    const sub = currentSub || "";
    if (!sub || sub === "dashboard")
      return <AdminDashboard onNavigate={onNavigate} />;
    if (sub === "users") return <UsersPage onNavigate={onNavigate} />;
    if (sub === "appointments")
      return <AppointmentsPage onNavigate={onNavigate} />;
    if (sub === "services") return <ServicesPage onNavigate={onNavigate} />;
    return <AdminDashboard onNavigate={onNavigate} />;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-6 gap-4">
        <aside className="md:col-span-1 bg-white rounded shadow p-4">
          <h3 className="font-semibold mb-3">Admin</h3>
          <nav className="flex flex-col space-y-2">
            <button
              onClick={() => onNavigate && onNavigate("/admin")}
              className="text-left px-2 py-2 rounded hover:bg-gray-50"
            >
              Dashboard
            </button>
            <button
              onClick={() => onNavigate && onNavigate("/admin/users")}
              className="text-left px-2 py-2 rounded hover:bg-gray-50"
            >
              Users
            </button>
            <button
              onClick={() => onNavigate && onNavigate("/admin/appointments")}
              className="text-left px-2 py-2 rounded hover:bg-gray-50"
            >
              Appointments
            </button>
            <button
              onClick={() => onNavigate && onNavigate("/admin/services")}
              className="text-left px-2 py-2 rounded hover:bg-gray-50"
            >
              Services
            </button>
          </nav>
        </aside>

        <section className="md:col-span-5 bg-transparent">
          {renderContent()}
        </section>
      </div>
    </div>
  );
}
