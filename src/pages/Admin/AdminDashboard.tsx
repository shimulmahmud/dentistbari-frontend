import React, { useEffect, useState } from "react";
import { db } from "../../lib/database";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const AppointmentStatusChart = ({ appointments }: { appointments: any[] }) => {
  const statusCounts = appointments.reduce((acc, appt) => {
    acc[appt.status] = (acc[appt.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-medium mb-4">Appointments by Status</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const RecentActivity = ({ activities }: { activities: any[] }) => (
  <div className="bg-white p-4 rounded shadow">
    <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
    <div className="space-y-4">
      {activities.map((activity, i) => (
        <div key={i} className="border-b pb-2 last:border-b-0">
          <div className="flex justify-between">
            <span className="font-medium">{activity.action}</span>
            <span className="text-sm text-gray-500">{activity.time}</span>
          </div>
          <p className="text-sm text-gray-600">{activity.details}</p>
        </div>
      ))}
    </div>
  </div>
);

export default function AdminDashboard({
  onNavigate,
}: {
  onNavigate?: (p: string) => void;
}) {
  const [stats, setStats] = useState({
    users: 0,
    appointments: 0,
    services: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
  });

  const [recentActivities, setRecentActivities] = useState([
    {
      action: "New Appointment",
      details: "John Doe booked a cleaning service",
      time: "2 min ago",
    },
    {
      action: "User Registration",
      details: "New user registered: jane@example.com",
      time: "1 hour ago",
    },
    {
      action: "Appointment Completed",
      details: "Dental checkup completed for Sarah",
      time: "3 hours ago",
    },
  ]);

  useEffect(() => {
    const users = db.getAllUsers();
    const appointments = db.getAllAppointments();
    const services = db.getAllServices();

    setStats({
      users: users.length,
      appointments: appointments.length,
      services: services.length,
      pendingAppointments: appointments.filter((a) => a.status === "pending")
        .length,
      completedAppointments: appointments.filter(
        (a) => a.status === "completed"
      ).length,
    });
  }, []);

  const statsData = [
    {
      name: "Users",
      value: stats.users,
      change: "+12%",
      icon: "👥",
      link: "/admin/users",
    },
    {
      name: "Appointments",
      value: stats.appointments,
      change: "+5%",
      icon: "📅",
      link: "/admin/appointments",
    },
    {
      name: "Services",
      value: stats.services,
      change: "+2%",
      icon: "⚙️",
      link: "/admin/services",
    },
    {
      name: "Pending",
      value: stats.pendingAppointments,
      change: "-3%",
      icon: "⏳",
      link: "/admin/appointments?status=pending",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsData.map((stat) => (
          <div
            key={stat.name}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onNavigate && onNavigate(stat.link)}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <p
                  className={`text-sm ${
                    stat.change.startsWith("+")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {stat.change} from last week
                </p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Appointments Chart */}
        <div className="lg:col-span-2">
          <AppointmentStatusChart appointments={db.getAllAppointments()} />
        </div>

        {/* Recent Activity */}
        <div>
          <RecentActivity activities={recentActivities} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigate && onNavigate("/admin/users/new")}
            className="p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
          >
            Add New User
          </button>
          <button
            onClick={() => onNavigate && onNavigate("/admin/appointments/new")}
            className="p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
          >
            Create Appointment
          </button>
          <button
            onClick={() => onNavigate && onNavigate("/admin/services/new")}
            className="p-3 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium"
          >
            Add Service
          </button>
          <button
            onClick={() => onNavigate && onNavigate("/admin/reports")}
            className="p-3 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors text-sm font-medium"
          >
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}
