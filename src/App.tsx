import { useState, useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { useAuth } from "./contexts/AuthContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { BookAppointmentPage } from "./pages/BookAppointmentPage";
import { ContactPage } from "./pages/ContactPage";
import { PatientPortalPage } from "./pages/PatientPortalPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";

function AppContent() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(
    user ? "patient-portal" : "home"
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    if (
      !user &&
      currentPage !== "home" &&
      currentPage !== "about" &&
      currentPage !== "services" &&
      currentPage !== "contact" &&
      currentPage !== "book-appointment" &&
      currentPage !== "forgot-password"
    ) {
      setCurrentPage("login");
    }
  }, [user, currentPage]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const shouldShowHeaderFooter = currentPage !== "login";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {shouldShowHeaderFooter && (
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
      )}

      <main
        className={shouldShowHeaderFooter ? "flex-grow pt-24" : "flex-grow"}
      >
        {currentPage === "login" && (
          <PatientPortalPage onNavigate={handleNavigate} initialView="login" />
        )}
        {currentPage === "home" && <HomePage onNavigate={handleNavigate} />}
        {currentPage === "about" && <AboutPage onNavigate={handleNavigate} />}
        {currentPage === "services" && (
          <ServicesPage onNavigate={handleNavigate} />
        )}
        {currentPage === "book-appointment" && (
          <BookAppointmentPage onNavigate={handleNavigate} />
        )}
        {currentPage === "contact" && (
          <ContactPage onNavigate={handleNavigate} />
        )}
        {currentPage === "patient-portal" && (
          <PatientPortalPage onNavigate={handleNavigate} initialView="login" />
        )}
        {currentPage === "forgot-password" && (
          <ForgotPasswordPage onNavigate={handleNavigate} />
        )}
      </main>

      {shouldShowHeaderFooter && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
