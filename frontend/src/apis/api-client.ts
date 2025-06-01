import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

const createApiClient = (role: "doctor" | "patient"): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(`${role}-token`);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

export const patientApiClient = createApiClient("patient");
export const doctorApiClient = createApiClient("doctor");
