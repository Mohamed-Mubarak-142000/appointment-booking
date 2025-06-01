import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { AuthContextType, AuthRole, UserData } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [patient, setPatient] = useState<UserData | null>(null);
  const [doctor, setDoctor] = useState<UserData | null>(null);

  // Load initial state from localStorage
  useEffect(() => {
    const loadAuthData = () => {
      const patientData = localStorage.getItem("patient-data");
      const doctorData = localStorage.getItem("doctor-data");

      if (patientData) setPatient(JSON.parse(patientData));
      if (doctorData) setDoctor(JSON.parse(doctorData));
    };

    loadAuthData();
  }, []);

  const login = useCallback((userData: UserData, role: AuthRole) => {
    localStorage.setItem(`${role}-token`, userData.token);
    localStorage.setItem(`${role}-data`, JSON.stringify(userData));

    if (role === "doctor") {
      setDoctor(userData);
    } else {
      setPatient(userData);
    }
  }, []);

  const logout = useCallback((role: AuthRole) => {
    localStorage.removeItem(`${role}-token`);
    localStorage.removeItem(`${role}-data`);

    if (role === "doctor") {
      setDoctor(null);
    } else {
      setPatient(null);
    }
  }, []);

  const isAuthenticated = useCallback(
    (role?: AuthRole) => {
      if (role) {
        const user = role === "doctor" ? doctor : patient;
        return !!user;
      }
      return !!doctor || !!patient;
    },
    [doctor, patient]
  );

  const getCurrentUser = useCallback(
    (role: AuthRole) => {
      return role === "doctor" ? doctor : patient;
    },
    [doctor, patient]
  );

  const value = {
    patient,
    doctor,
    login,
    logout,
    isAuthenticated,
    getCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function usePatientAuth() {
  const context = useAuth();
  return {
    ...context,
    user: context.patient,
    isAuthenticated: () => context.isAuthenticated("patient"),
    login: (userData: UserData) => context.login(userData, "patient"),
    logout: () => context.logout("patient"),
  };
}

export function useDoctorAuth() {
  const context = useAuth();
  return {
    ...context,
    user: context.doctor,
    isAuthenticated: () => context.isAuthenticated("doctor"),
    login: (userData: UserData) => context.login(userData, "doctor"),
    logout: () => context.logout("doctor"),
  };
}
