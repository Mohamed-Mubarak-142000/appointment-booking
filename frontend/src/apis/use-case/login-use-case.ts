import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { LoginCredentials, UserData } from "../../types";
import type { AxiosError } from "axios";
import { useAuth } from "../../context/auth-context";
import apiClient from "../api-client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useLogin(): UseMutationResult<
  UserData,
  AxiosError<{ message: string }>,
  LoginCredentials,
  { previousAuthState?: UserData | null }
> {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await apiClient.post<UserData>(
        "/auth/login",
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return data;
    },
    onMutate: async () => {
      const userString = localStorage.getItem("user");
      const previousAuthState = userString
        ? (JSON.parse(userString) as UserData)
        : null;
      return { previousAuthState };
    },
    onSuccess: (data) => {
      login(data);
      toast.success("Login successful!");
      if (data.role === "Doctor") {
        navigate("/doctor/profile");
      } else {
        navigate("/patient/profile");
      }
    },
    onError: (error, _, context) => {
      const errorMessage = error.response?.data.message || "Login failed";
      toast.error(errorMessage);
      if (context?.previousAuthState) {
        login(context.previousAuthState);
      }
    },
    retry: (failureCount, error) => {
      if (error.response?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
  });
}
