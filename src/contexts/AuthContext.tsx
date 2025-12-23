import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { db } from "../lib/database";

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role?: "doctor" | "patient" | "admin";
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    phone: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (
    email: string,
    token: string,
    newPassword: string
  ) => Promise<void>;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("dentist-bari-user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    const dbUser = db.getUserByEmail(email);
    if (!dbUser || dbUser.password !== password) {
      throw new Error("Invalid email or password");
    }

    const authUser: AuthUser = {
      id: dbUser.id,
      email: dbUser.email,
      fullName: dbUser.fullName,
      phone: dbUser.phone,
      role: dbUser.role,
    };

    setUser(authUser);
    localStorage.setItem("dentist-bari-user", JSON.stringify(authUser));
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    phone: string
  ) => {
    const existingUser = db.getUserByEmail(email);
    if (existingUser) {
      throw new Error("Email already registered");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    const newUser = db.createUser({
      email,
      password,
      fullName,
      phone,
      role: "patient",
    } as any);

    const authUser: AuthUser = {
      id: newUser.id,
      email: newUser.email,
      fullName: newUser.fullName,
      phone: newUser.phone,
      role: (newUser as any).role,
    };

    setUser(authUser);
    localStorage.setItem("dentist-bari-user", JSON.stringify(authUser));
  };

  const isAdmin = () => {
    if (!user) return false;
    const dbUser = db.getUserByEmail(user.email);
    return !!dbUser && (dbUser.role === "admin" || dbUser.role === "doctor");
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem("dentist-bari-user");
  };

  const requestPasswordReset = async (email: string) => {
    const dbUser = db.getUserByEmail(email);
    if (!dbUser) {
      throw new Error("Email not found");
    }

    const token = db.createPasswordResetToken(email);
    console.log("Password reset token:", token);
  };

  const resetPassword = async (
    email: string,
    token: string,
    newPassword: string
  ) => {
    if (!db.verifyPasswordResetToken(email, token)) {
      throw new Error("Invalid or expired reset token");
    }

    const dbUser = db.getUserByEmail(email);
    if (!dbUser) {
      throw new Error("User not found");
    }

    db.updateUser(dbUser.id, { password: newPassword });
    db.removePasswordResetToken(email, token);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        requestPasswordReset,
        resetPassword,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
