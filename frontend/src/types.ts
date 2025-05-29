export interface Speciality {
  speciality: string;
  image: string;
}

export interface Address {
  line1: string;
  line2: string;
}

export interface Doctor {
  _id: string;
  name: string;
  image: string;
  speciality: string;
  degree: string;
  experience: string;
  about: string;
  fees: number;
  address: Address;
}

export interface TabProps {
  label: string;
  value: string;
}

export type AuthTab = "login" | "register";

export interface NavItem {
  name: string;
  path: string;
}

/********************************************************************** */
// types/auth.ts
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserData {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  age?: number;
  gender?: string;
  photo?: string;
  bookedDoctors?: string[];
  role: "Doctor" | "Patient";
  token: string;
}

export interface AuthContextType {
  user: UserData | null;
  login: (userData: UserData) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// types.ts
export interface UpdatePatientData {
  _id: string;
  name?: string;
  phone?: string;
  age?: number;
  gender?: "male" | "female" | "other";
  photo?: string;
  // Add other updatable fields
}
