import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type {
  LoginCredentials,
  RegisterFormData,
  UserData,
} from "../../../types";
import { usePatientAuth } from "../../../context/auth-context";
import { getErrorMessage, handleRegistrationError } from "../doctor/auth";
import { patientApiClient } from "../../api-client";

export function usePatientLogin(): UseMutationResult<
  UserData,
  AxiosError,
  LoginCredentials
> {
  const { login } = usePatientAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await patientApiClient.post<UserData>(
        "/auth/patient/login",
        credentials
      );
      return data;
    },
    onSuccess: (data) => {
      login(data);
      navigate("/");
      toast.success("Patient login successful!");
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message || "Patient login failed");
    },
  });
}

export function usePatientRegister(): UseMutationResult<
  UserData,
  AxiosError,
  RegisterFormData
> {
  const { login } = usePatientAuth();

  return useMutation({
    mutationFn: async (registerData: RegisterFormData) => {
      const { data } = await patientApiClient.post<UserData>(
        "/auth/patient/register",
        registerData
      );
      return data;
    },
    onSuccess: (data) => {
      login(data);
      // navigate("");
      toast.success("Patient registration successful!");
    },
    onError: (error) => {
      handleRegistrationError(error);
    },
  });
}

export function usePatientLogout(): UseMutationResult<
  { message: string },
  AxiosError
> {
  const { logout } = usePatientAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const { data } = await patientApiClient.post<{ message: string }>(
        "/auth/logout"
      );
      return data;
    },
    onSuccess: () => {
      logout();
      navigate("/");
      toast.success("Patient logged out successfully");
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message || "Patient logout failed");
    },
  });
}
