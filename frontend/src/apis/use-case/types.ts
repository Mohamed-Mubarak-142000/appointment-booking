// Base User Types
export type AuthRole = "doctor" | "patient";

export interface BaseUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  age?: number;
  createdAt: string;
  updatedAt: string;
}

// Doctor Specific Types
export interface DoctorData extends BaseUser {
  role: "Doctor";
  specialty: string;
  address?: string;
  governorate?: string;
  bio?: string;
  experience?: number;
  availableSlots?: AvailableSlot[];
}

export interface AvailableSlot {
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface AddSlotData {
  doctorId: string;
  slots: Omit<AvailableSlot, "isBooked">[];
}

export interface UpdateDoctorData
  extends Partial<
    Omit<DoctorData, "_id" | "role" | "createdAt" | "updatedAt">
  > {
  _id: string;
}

// Patient Specific Types
export interface PatientData extends BaseUser {
  role: "Patient";
  gender?: "male" | "female" | "other";
  bookedDoctors?: string[]; // Array of doctor IDs
}

export interface UpdatePatientData
  extends Partial<
    Omit<PatientData, "_id" | "role" | "createdAt" | "updatedAt">
  > {
  _id: string;
}

// Appointment Types
export interface Appointment {
  _id: string;
  doctorId: string;
  patientId: string;
  date: string;
  startTime: string;
  endTime: string;
  reason?: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
  updatedAt: string;
}

export interface BookAppointmentData {
  patientId: string;
  doctorId: string;
  slot: {
    date: string;
    startTime: string;
  };
  reason?: string;
}

// Auth Types
export interface UserData {
  _id: string;
  name: string;
  email: string;
  role: "Doctor" | "Patient";
  token: string;
  specialty?: string; // For doctors
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: AuthRole;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: AuthRole;
  phone?: string;
  age?: number;
  // Doctor specific
  specialty?: string;
  address?: string;
  governorate?: string;
  bio?: string;
  experience?: number;
  // Patient specific
  gender?: "male" | "female" | "other";
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

// Context Types
export interface AuthContextType {
  doctor: UserData | null;
  patient: UserData | null;
  login: (userData: UserData, role: AuthRole) => void;
  logout: (role: AuthRole) => void;
  isAuthenticated: (role?: AuthRole) => boolean;
  getCurrentUser: (role: AuthRole) => UserData | null;
}
