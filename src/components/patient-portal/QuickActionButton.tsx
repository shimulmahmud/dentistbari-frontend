import { Plus } from "lucide-react";

interface QuickActionButtonProps {
  onClick: () => void;
}

export const QuickActionButton = ({ onClick }: QuickActionButtonProps) => (
  <button
    onClick={onClick}
    aria-label="New appointment"
    className="fixed bottom-6 left-1/2 transform -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-40 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-colors"
  >
    <Plus className="h-5 w-5" />
  </button>
);
