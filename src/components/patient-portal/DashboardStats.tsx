import { Calendar, FileText } from "lucide-react";

interface DashboardStatsProps {
  t: (key: string, fallback?: string) => string;
}

export const DashboardStats = ({ t }: DashboardStatsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
          <Calendar className="h-6 w-6 text-blue-600" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">
            {t("Upcoming", "আসন্ন")}
          </p>
          <p className="text-2xl font-semibold text-gray-900">3</p>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">
            {t("Completed", "সম্পন্ন")}
          </p>
          <p className="text-2xl font-semibold text-gray-900">12</p>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-yellow-100 rounded-lg p-3">
          <svg
            className="h-6 w-6 text-yellow-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">
            {t("Pending", "মুলতুবি")}
          </p>
          <p className="text-2xl font-semibold text-gray-900">1</p>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-purple-100 rounded-lg p-3">
          <FileText className="h-6 w-6 text-purple-600" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">
            {t("Records", "রেকর্ড")}
          </p>
          <p className="text-2xl font-semibold text-gray-900">8</p>
        </div>
      </div>
    </div>
  </div>
);
