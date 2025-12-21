import { Eye, EyeOff } from "lucide-react";

interface LoginFormProps {
  t: (key: string, fallback?: string) => string;
  loginData: any;
  setLoginData: React.Dispatch<React.SetStateAction<any>>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  handleLogin: (e: React.FormEvent) => Promise<void>;
  onNavigate: (page: string) => void;
  setView: React.Dispatch<
    React.SetStateAction<"login" | "signup" | "dashboard">
  >;
}

export const LoginForm = ({
  t,
  loginData,
  setLoginData,
  showPassword,
  setShowPassword,
  loading,
  handleLogin,
  onNavigate,
  setView,
}: LoginFormProps) => (
  <form onSubmit={handleLogin} className="space-y-6">
    {loginData.error && (
      <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
        {loginData.error}
      </div>
    )}

    <div>
      <label
        htmlFor="login-email"
        className="block text-sm font-medium text-gray-700 mb-1.5"
      >
        {t("Email Address", "ইমেইল ঠিকানা")}
      </label>
      <div className="relative">
        <input
          id="login-email"
          type="email"
          required
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
          className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          placeholder={t("your@email.com", "আপনার ইমেইল")}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        </div>
      </div>
    </div>

    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">
          {t("Password", "পাসওয়ার্ড")}
        </label>
        <button
          type="button"
          onClick={() => onNavigate("forgot-password")}
          className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
        >
          {t("Forgot password?", "পাসওয়ার্ড ভুলে গেছেন?")}
        </button>
      </div>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          required
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 pr-12"
          placeholder="••••••••"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>

    <div className="pt-2">
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3.5 px-4 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {t("Signing in...", "সাইন ইন করা হচ্ছে...")}
          </>
        ) : (
          t("Sign In", "সাইন ইন")
        )}
      </button>
    </div>

    <div className="mt-6 text-center text-sm">
      <p className="text-gray-600">
        {t("Don't have an account?", "অ্যাকাউন্ট নেই?")}{" "}
        <button
          type="button"
          onClick={() => setView("signup")}
          className="font-medium text-blue-600 hover:text-blue-500 transition-colors focus:outline-none focus:underline"
        >
          {t("Create one", "একটি তৈরি করুন")}
        </button>
      </p>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              {t("Or continue with", "অথবা")}
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {t("Google", "গুগল")}
          </button>

          <button
            type="button"
            className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill="#1877F2"
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
            {t("Facebook", "ফেসবুক")}
          </button>
        </div>
      </div>
    </div>
  </form>
);
