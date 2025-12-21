import { CheckCircle } from "lucide-react";

interface SuccessStateProps {
  t: (key: string, fallback?: string) => string;
  onNavigate: (page: string) => void;
}

export const SuccessState = ({ t, onNavigate }: SuccessStateProps) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center py-12">
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-slate-900/40"></div>
    <div className="relative max-w-md mx-auto px-4">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center border border-white/20">
        <div className="bg-teal-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-teal-500/30">
          <CheckCircle className="h-12 w-12 text-teal-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">
          {t("Appointment Requested!", "অ্যাপয়েন্টমেন্ট অনুরোধ করা হয়েছে!")}
        </h2>
        <p className="text-gray-300 mb-8">
          {t(
            "We will confirm your appointment shortly",
            "আমরা শীঘ্রই আপনার অ্যাপয়েন্টমেন্ট নিশ্চিত করব"
          )}
        </p>
        <button
          onClick={() => onNavigate("home")}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          {t("Return to Home", "হোমে ফিরে যান")}
        </button>
      </div>
    </div>
  </div>
);
