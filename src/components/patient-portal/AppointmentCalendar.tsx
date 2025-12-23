import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasAppointment: boolean;
  appointments?: string[];
}

interface AppointmentCalendarProps {
  t: (key: string, fallback?: string) => string;
}

export const AppointmentCalendar = ({ t }: AppointmentCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 23)); // Dec 23, 2025

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Mock appointments for demo
  const appointmentDates: Record<number, string[]> = {
    25: ["10:00 AM - Regular Checkup"],
    30: ["2:00 PM - Crown Placement"],
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = (): CalendarDay[] => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const daysInPrevMonth = getDaysInMonth(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
    const today = new Date();
    const isCurrentMonth =
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear();

    const days: CalendarDay[] = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: daysInPrevMonth - i,
        isCurrentMonth: false,
        isToday: false,
        hasAppointment: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = isCurrentMonth && i === today.getDate();
      days.push({
        date: i,
        isCurrentMonth: true,
        isToday,
        hasAppointment: !!appointmentDates[i],
        appointments: appointmentDates[i],
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
        isToday: false,
        hasAppointment: false,
      });
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              {t("Appointment Calendar", "অ্যাপয়েন্টমেন্ট ক্যালেন্ডার")}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevMonth}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Day names */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center text-[10px] md:text-xs font-semibold text-gray-500 py-1"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`h-10 md:h-14 flex flex-col items-center justify-center rounded-md text-sm md:text-sm font-medium transition-all cursor-pointer relative group
                ${
                  day.isToday
                    ? "bg-blue-600 text-white"
                    : day.isCurrentMonth
                    ? day.hasAppointment
                      ? "bg-green-50 text-green-700 border border-green-100 hover:bg-green-100"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    : "text-gray-300 bg-gray-50"
                }
              `}
            >
              <span className="text-xs md:text-sm">{day.date}</span>
              {day.hasAppointment && (
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1" />
              )}

              {/* Appointment tooltip */}
              {day.hasAppointment && day.appointments && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                  <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded-md">
                    {day.appointments[0]}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded" />
            <span className="text-gray-600 text-xs">{t("Today", "আজ")}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-200 rounded border-2 border-green-300" />
            <span className="text-gray-600 text-xs">
              {t("Appointment", "অ্যাপয়েন্টমেন্ট")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
