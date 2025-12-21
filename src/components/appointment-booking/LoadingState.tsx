interface LoadingStateProps {
  t: (key: string, fallback?: string) => string;
}

export const LoadingState = ({ t }: LoadingStateProps) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-slate-900/40"></div>
    <div className="relative text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
      <p className="text-white">{t("Loading...", "লোড হচ্ছে...")}</p>
    </div>
  </div>
);
