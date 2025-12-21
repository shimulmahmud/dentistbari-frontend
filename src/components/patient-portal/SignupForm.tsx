import { Eye, EyeOff } from "lucide-react";

interface SignupFormProps {
  t: (key: string, fallback?: string) => string;
  signupData: any;
  setSignupData: React.Dispatch<React.SetStateAction<any>>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  handleSignup: (e: React.FormEvent) => Promise<void>;
  onNavigate: (page: string) => void;
  setView: React.Dispatch<
    React.SetStateAction<"login" | "signup" | "dashboard">
  >;
}

export const SignupForm = ({
  t,
  signupData,
  setSignupData,
  showPassword,
  setShowPassword,
  loading,
  handleSignup,
  onNavigate,
  setView,
}: SignupFormProps) => (
  <form onSubmit={handleSignup} className="space-y-5">
    {signupData.error && (
      <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
        {signupData.error}
      </div>
    )}

    <div className="space-y-1">
      <label
        htmlFor="signup-fullName"
        className="block text-sm font-medium text-gray-700 mb-1.5"
      >
        {t("Full Name", "পুরো নাম")}
      </label>
      <input
        id="signup-fullName"
        type="text"
        required
        value={signupData.fullName}
        onChange={(e) =>
          setSignupData({ ...signupData, fullName: e.target.value })
        }
        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        placeholder={t("John Doe", "আপনার পুরো নাম")}
      />
    </div>

    <div className="space-y-1">
      <label
        htmlFor="signup-email"
        className="block text-sm font-medium text-gray-700 mb-1.5"
      >
        {t("Email Address", "ইমেইল ঠিকানা")}
      </label>
      <div className="relative">
        <input
          id="signup-email"
          type="email"
          required
          value={signupData.email}
          onChange={(e) =>
            setSignupData({ ...signupData, email: e.target.value })
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
      <label
        htmlFor="signup-phone"
        className="block text-sm font-medium text-gray-700 mb-1.5"
      >
        {t("Phone Number", "ফোন নাম্বার")}
      </label>
      <input
        id="signup-phone"
        type="tel"
        required
        value={signupData.phone}
        onChange={(e) =>
          setSignupData({ ...signupData, phone: e.target.value })
        }
        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        placeholder={t("+8801XXXXXXXXX", "০১৭XXXXXXXX")}
      />
    </div>

    <div className="space-y-1">
      <div className="flex items-center justify-between mb-1.5">
        <label
          htmlFor="signup-password"
          className="block text-sm font-medium text-gray-700"
        >
          {t("Password", "পাসওয়ার্ড")}
        </label>
      </div>
      <div className="relative">
        <input
          id="signup-password"
          type={showPassword ? "text" : "password"}
          required
          value={signupData.password}
          onChange={(e) =>
            setSignupData({ ...signupData, password: e.target.value })
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
      <p className="text-xs text-gray-500 mt-1">
        {t("Minimum 6 characters", "ন্যূনতম ৬ অক্ষর")}
      </p>
    </div>

    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        {t("Confirm Password", "পাসওয়ার্ড নিশ্চিত করুন")}
      </label>
      <input
        type={showPassword ? "text" : "password"}
        required
        value={signupData.confirmPassword}
        onChange={(e) =>
          setSignupData({
            ...signupData,
            confirmPassword: e.target.value,
          })
        }
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        placeholder="••••••••"
      />
    </div>

    <button
      type="submit"
      disabled={loading}
      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
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
          {t("Creating Account...", "অ্যাকাউন্ট তৈরি করা হচ্ছে...")}
        </>
      ) : (
        t("Create Account", "অ্যাকাউন্ট তৈরি করুন")
      )}
    </button>

    <div className="text-center text-sm text-gray-600 pt-2">
      {t("Already have an account?", "ইতিমধ্যে একটি অ্যাকাউন্ট আছে?")}{" "}
      <button
        type="button"
        onClick={() => setView("login")}
        className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
      >
        {t("Sign in", "সাইন ইন করুন")}
      </button>
    </div>
  </form>
);
