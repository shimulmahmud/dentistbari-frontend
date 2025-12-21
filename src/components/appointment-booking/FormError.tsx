import { AlertCircle } from "lucide-react";

interface FormErrorProps {
  message: string;
  t: (key: string, fallback?: string) => string;
}

export const FormError = ({ message, t }: FormErrorProps) => (
  <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-start space-x-3">
    <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
    <p className="text-red-200">{message}</p>
  </div>
);
