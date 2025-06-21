import type React from "react";
import type { DoctorUpdateFormData } from "../../schemas/doctor-schema";

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
  photo?: string;
  gender?: "male" | "female" | "other";
}

export interface Review {
  _id: string;
  patient: {
    _id: string;
    name: string;
    photo?: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

interface LocationProps {
  lat: number;
  lng: number;
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
  reviews?: Review[];
  averageRating?: number;
  consultationFee?: number;
  procedureFee?: number;
  testFee?: number;
  medicationFee?: number;
  photo?: string;

  location?: LocationProps;
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
  data: FormData | DoctorUpdateFormData;
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
export interface Appointment {
  _id: string;
  doctor: string | DoctorData;
  patient: string | PatientData;
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppointmentData {
  doctorId: string;
  date: Date;
  startTime: string;
  endTime: string;
  reason: string;
  slotId?: string;
}

export type AppointmentStatusUpdate = "confirmed" | "cancelled" | "completed";

export interface UpdateAppointmentStatusRequest {
  appointmentId: string;
  status: "confirmed" | "cancelled";
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

// src/types.ts
export interface Appointment {
  _id: string;
  doctor: DoctorData | string;
  patient: PatientData | string;
  date: string;
  startTime: string;
  endTime: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  reason: string;
  price?: number;
  type?: "Consultation" | "Procedure" | "Test" | "Medication";
  createdAt: string;
}

export interface DashboardStats {
  totalAppointments: number;
  appointmentsChange: number;
  totalPatients: number;
  patientsChange: number;
  totalRevenue: number;
  revenueChange: number;
  averageRating: number;
  ratingChange: number;
  availableSlotsCount: number;
}

export interface AppointmentStats {
  weekly: {
    labels: string[];
    scheduled: number[];
    completed: number[];
    cancelled: number[];
  };
  monthly: {
    labels: string[];
    scheduled: number[];
    completed: number[];
    cancelled: number[];
  };
}

export interface PatientStats {
  success: boolean;
  labels: string[];
  newPatients: {
    archive: number[];
    notArchive: number[];
  };
  returningPatients: {
    archive: number[];
    notArchive: number[];
  };
}

export interface RevenueStats {
  labels: string[];
  data: number[];
}

export interface RatingStats {
  labels: string[];
  ratings: number[];
}

export interface DoctorSlots {
  name: string;
  specialty: string;
}

export type SlotType = "consultation" | "procedure" | "test" | "medication";

export interface AvailableSlot {
  _id: string;
  day: string;
  startTime: string;
  endTime: string;
  slotDuration: number;
  isAvailable: boolean;
  type: SlotType;
}

export interface AvailableSlotsData {
  doctor: DoctorSlots;
  slots: AvailableSlot[];
}
export interface DoctorSlotsResponse {
  success: boolean;
  data: AvailableSlotsData;
}
/************************ */
// types.ts
export type Column<T> = {
  id: keyof T;
  label: string;
  align?: "left" | "right" | "center";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  format?: (value: any, row?: T) => React.ReactNode;
  sortable?: boolean;
};

export type PaginationProps = {
  page: number;
  rowsPerPage: number;
  totalRows: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
};

export type SortingProps<T> = {
  sortBy: keyof T;
  sortOrder: "asc" | "desc";
  onSort: (columnId: keyof T) => void;
};

export interface DataTableProps<T> {
  title?: string;
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  error?: string | null;
  renderAddButton?: React.ReactNode;
  renderEditButton?: (row: T, handleMenuClose: () => void) => React.ReactNode;
  renderDeleteButton?: (row: T, handleMenuClose: () => void) => React.ReactNode;
  renderViewButton?: (row: T, handleMenuClose: () => void) => React.ReactNode;
  addButtonText?: string;
  emptyMessage?: string;
  pagination?: PaginationProps;
  sorting?: SortingProps<T>;
  // New props for search
  searchTerm?: string;
  onSearchChange?: (searchTerm: string) => void;
  searchPlaceholder?: string;
  showSearch?: boolean;
  onView?: (row: T) => void;
  deleteActionLoading?: boolean;
}
