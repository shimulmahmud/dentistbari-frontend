import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

interface LoginSignupViewProps {
  t: (key: string, fallback?: string) => string;
  view: "login" | "signup";
  setView: React.Dispatch<
    React.SetStateAction<"login" | "signup" | "dashboard">
  >;
  onNavigate: (page: string) => void;
  loginData: any;
  setLoginData: React.Dispatch<React.SetStateAction<any>>;
  signupData: any;
  setSignupData: React.Dispatch<React.SetStateAction<any>>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  handleLogin: (e: React.FormEvent) => Promise<void>;
  handleSignup: (e: React.FormEvent) => Promise<void>;
}

export const LoginSignupView = ({
  t,
  view,
  setView,
  onNavigate,
  loginData,
  setLoginData,
  signupData,
  setSignupData,
  showPassword,
  setShowPassword,
  loading,
  handleLogin,
  handleSignup,
}: LoginSignupViewProps) => {
  const toggleView = (newView: "login" | "signup") => {
    setView(newView);
    // Clear any previous errors
    setLoginData({ ...loginData, error: "" });
    setSignupData({ ...signupData, error: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <button
            onClick={() => onNavigate("home")}
            className="group inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1.5 transition-transform duration-200 transform group-hover:-translate-x-0.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            {t("Back to Home", "হোমে ফিরে যান")}
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Tabs */}
          <div className="flex">
            <button
              onClick={() => toggleView("login")}
              className={`flex-1 py-4 px-6 text-center text-sm font-medium transition-all duration-200 relative ${
                view === "login"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {t("Sign In", "সাইন ইন")}
              {view === "login" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
            <button
              onClick={() => toggleView("signup")}
              className={`flex-1 py-4 px-6 text-center text-sm font-medium transition-all duration-200 relative ${
                view === "signup"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {t("Create Account", "নতুন অ্যাকাউন্ট")}
              {view === "signup" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
          </div>

          <div className="p-6">
            {view === "login" ? (
              <LoginForm
                t={t}
                loginData={loginData}
                setLoginData={setLoginData}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                loading={loading}
                handleLogin={handleLogin}
                onNavigate={onNavigate}
                setView={setView}
              />
            ) : (
              <SignupForm
                t={t}
                signupData={signupData}
                setSignupData={setSignupData}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                loading={loading}
                handleSignup={handleSignup}
                onNavigate={onNavigate}
                setView={setView}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
