import { Calendar, FileText, CheckCircle, Clock } from "lucide-react";

interface DashboardStatsProps {
  t: (key: string, fallback?: string) => string;
}

export const DashboardStats = ({ t }: DashboardStatsProps) => {
  const stats = [
    {
      id: "upcoming",
      label: t("Upcoming", "আসন্ন"),
      value: "3",
      icon: Calendar,
      gradient: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      trend: "+2 this month",
    },
    {
      id: "completed",
      label: t("Completed", "সম্পন্ন"),
      value: "12",
      icon: CheckCircle,
      gradient: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      trend: "+1 last visit",
    },
    {
      id: "pending",
      label: t("Pending", "মুলতুবি"),
      value: "1",
      icon: Clock,
      gradient: "from-yellow-400 to-yellow-600",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
      trend: "Needs attention",
    },
    {
      id: "records",
      label: t("Records", "রেকর্ড"),
      value: "8",
      icon: FileText,
      gradient: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      trend: "All up to date",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            className={`${stat.bgColor} rounded-2xl p-6 border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300 cursor-pointer group`}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`bg-gradient-to-br ${stat.gradient} rounded-xl p-3 group-hover:scale-110 transition-transform`}
              >
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div className={`text-xs font-semibold ${stat.textColor}`}>
                {stat.trend}
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">
              {stat.label}
            </p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
};
