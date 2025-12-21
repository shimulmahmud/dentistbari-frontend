import { useState } from "react";
import { Clock, ChevronDown } from "lucide-react";

interface TimeDropdownProps {
  value: string;
  onChange: (value: string) => void;
  timeSlots: string[];
  t: (key: string, fallback?: string) => string;
}

export const TimeDropdown = ({
  value,
  onChange,
  timeSlots,
  t,
}: TimeDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-left flex items-center justify-between hover:border-white/40"
      >
        <span className={value ? "text-white" : "text-gray-400"}>
          {value || t("Select time", "সময় নির্বাচন করুন")}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-white/20 rounded-lg shadow-xl max-h-60 overflow-auto">
          {timeSlots.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => {
                onChange(time);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left hover:bg-white/10 transition-colors flex items-center justify-between ${
                value === time ? "bg-teal-600/20 text-teal-400" : "text-white"
              }`}
            >
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                {time}
              </span>
              {value === time && (
                <svg
                  className="h-5 w-5 text-teal-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
