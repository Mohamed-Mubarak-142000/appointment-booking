import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useAuth } from "../../context/auth-context";
import apiClient from "../api-client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type { UserData } from "../../types";

export function useLogout(): UseMutationResult<
  { success: boolean; message: string },
  AxiosError<{ message: string }>,
  void,
  { previousAuthState?: UserData | null }
> {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.post<{
        success: boolean;
        message: string;
      }>("/auth/logout");
      return data;
    },
    onMutate: async () => {
      const userString = localStorage.getItem("user");
      const previousAuthState = userString
        ? (JSON.parse(userString) as UserData)
        : null;
      return { previousAuthState };
    },
    onSuccess: () => {
      logout();
      toast.success("Logged out successfully");
      navigate("/login");
    },
    onError: (error) => {
      const errorMessage = error.response?.data.message || "Logout failed";
      toast.error(errorMessage);
    },
    // Always refetch after error or success
    retry: false,
  });
}
