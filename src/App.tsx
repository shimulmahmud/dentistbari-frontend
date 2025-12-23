import { useState, useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { useAuth } from "./contexts/AuthContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ServiceDetailsPage } from "./pages/ServiceDetailsPage";
import { BookAppointmentPage } from "./pages/BookAppointmentPage";
import { ContactPage } from "./pages/ContactPage";
import { PatientPortalPage } from "./pages/PatientPortalPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import AdminLayout from "./pages/Admin/AdminLayout";

function AppContent() {
  const { user, isAdmin } = useAuth();
  const [currentPage, setCurrentPage] = useState(
    user ? "patient-portal" : "home"
  );

  // Extract page and params from URL
  const [currentRoute, setCurrentRoute] = useState(() => {
    const path = window.location.pathname.substring(1);
    const [page, ...params] = path.split("/");
    return { page, params };
  });

  // Update route when URL changes
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.substring(1);
      const [page, ...params] = path.split("/");
      setCurrentRoute({ page, params });
      setCurrentPage(page || "home");
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  // Update URL when currentPage changes
  useEffect(() => {
    if (currentPage && !window.location.pathname.includes(currentPage)) {
      window.history.pushState({}, "", `/${currentPage}`);
    }
  }, [currentPage]);

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

  useEffect(() => {
    // protect admin route: redirect non-admins
    if (currentRoute.page === "admin") {
      if (!isAdmin || !isAdmin()) {
        setCurrentPage(user ? "home" : "login");
      }
    }
  }, [currentRoute.page, user, isAdmin]);

  const handleNavigate = (page: string) => {
    if (page.startsWith("/")) {
      // Handle direct path navigation
      const [pageName, ...params] = page.substring(1).split("/");
      setCurrentRoute({ page: pageName, params });
      setCurrentPage(pageName);
      window.history.pushState({}, "", page);
    } else {
      // Handle regular page navigation
      setCurrentPage(page);
      setCurrentRoute({ page, params: [] });
      window.history.pushState({}, "", `/${page}`);
    }
  };

  const shouldShowHeaderFooter =
    currentPage !== "login" &&
    currentPage !== "patient-portal" &&
    !currentPage.startsWith("services/");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {shouldShowHeaderFooter && (
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
      )}

      <main
        className={shouldShowHeaderFooter ? "flex-grow pt-24" : "flex-grow"}
      >
        {currentRoute.page === "login" && (
          <PatientPortalPage onNavigate={handleNavigate} initialView="login" />
        )}
        {(currentRoute.page === "home" || currentRoute.page === "") && (
          <HomePage onNavigate={handleNavigate} />
        )}
        {currentRoute.page === "about" && (
          <AboutPage onNavigate={handleNavigate} />
        )}
        {currentRoute.page === "services" &&
          currentRoute.params.length === 0 && (
            <ServicesPage onNavigate={handleNavigate} />
          )}
        {currentRoute.page === "services" && currentRoute.params.length > 0 && (
          <ServiceDetailsPage onNavigate={handleNavigate} />
        )}
        {currentRoute.page === "book-appointment" && (
          <BookAppointmentPage onNavigate={handleNavigate} />
        )}
        {currentRoute.page === "contact" && (
          <ContactPage onNavigate={handleNavigate} />
        )}
        {currentRoute.page === "patient-portal" && (
          <PatientPortalPage onNavigate={handleNavigate} initialView="login" />
        )}
        {currentRoute.page === "admin" && (
          <AdminLayout
            currentSub={currentRoute.params[0]}
            onNavigate={handleNavigate}
          />
        )}
        {currentRoute.page === "forgot-password" && (
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
