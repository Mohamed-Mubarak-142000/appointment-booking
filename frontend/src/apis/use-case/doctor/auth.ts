import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type {
  LoginCredentials,
  RegisterFormData,
  UserData,
} from "../../../types";
import { useDoctorAuth } from "../../../context/auth-context";
import { doctorApiClient } from "../../api-client";

export function useDoctorLogin(): UseMutationResult<
  UserData,
  AxiosError,
  LoginCredentials
> {
  const { login } = useDoctorAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await doctorApiClient.post<UserData>(
        "/auth/doctor/login",
        credentials
      );
      return data;
    },
    onSuccess: (data) => {
      login(data);
      navigate("/doctor/dashboard");
      window.location.reload();

      toast.success("Doctor login successful!");
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message || "Doctor login failed");
    },
  });
}

export function useDoctorRegister(): UseMutationResult<
  UserData,
  AxiosError,
  RegisterFormData
> {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (registerData: RegisterFormData) => {
      const { data } = await doctorApiClient.post<UserData>(
        "/auth/doctor/register",
        registerData
      );
      return data;
    },
    onSuccess: () => {
      navigate("/doctor/login");
      toast.success("Doctor registration successful!");
    },
    onError: (error) => {
      handleRegistrationError(error);
    },
  });
}

export function useDoctorLogout(): UseMutationResult<
  { message: string },
  AxiosError
> {
  const { logout } = useDoctorAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const { data } = await doctorApiClient.post<{ message: string }>(
        "/auth/logout"
      );
      return data;
    },
    onSuccess: () => {
      logout();
      navigate("/");
      toast.success("Doctor logged out successfully");
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message || "Doctor logout failed");
    },
  });
}

export function useRequestDoctorPasswordReset(): UseMutationResult<
  { message: string; email: string },
  AxiosError,
  { email: string }
> {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ email }) => {
      const { data } = await doctorApiClient.post<{
        message: string;
        email: string;
      }>("/auth/request-password", { email });
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/doctor/reset-password", { state: { email: data.email } });
    },
    onError: (error) => {
      const message = getErrorMessage(error) || "Failed to send OTP";
      toast.error(message);
    },
  });
}

export function useResetDoctorPasswordWithOTP(): UseMutationResult<
  { message: string },
  AxiosError,
  { email: string; otp: string; newPassword: string }
> {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ email, otp, newPassword }) => {
      const { data } = await doctorApiClient.post<{ message: string }>(
        "/auth/reset-password",
        { email, otp, newPassword }
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/doctor/login");
    },
    onError: (error) => {
      const message = getErrorMessage(error) || "Password reset failed";
      toast.error(message);
    },
  });
}

// Helper functions
export function getErrorMessage(error: AxiosError): string | undefined {
  return error.response?.data &&
    typeof error.response.data === "object" &&
    "message" in error.response.data
    ? (error.response.data as { message?: string }).message
    : undefined;
}

export function handleRegistrationError(error: AxiosError): void {
  const errorMessage = getErrorMessage(error) || "Doctor registration failed";

  if (
    error.response?.data &&
    typeof error.response.data === "object" &&
    "errors" in error.response.data
  ) {
    const errors = (
      error.response.data as { errors?: Record<string, string[]> }
    ).errors;
    if (errors) {
      Object.entries(errors).forEach(([field, messages]) => {
        toast.error(`${field}: ${messages.join(", ")}`);
      });
      return;
    }
  }

  toast.error(errorMessage);
}
