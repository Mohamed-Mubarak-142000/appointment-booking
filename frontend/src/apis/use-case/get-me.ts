import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import type { UpdatePatientData, UserData } from "../../types";
import type { AxiosError } from "axios";
import { useAuth } from "../../context/auth-context";
import apiClient from "../api-client";
import { toast } from "react-toastify";

export function useGetCurrentUser(): UseQueryResult<
  UserData,
  AxiosError<{ message: string }>
> {
  const { user } = useAuth();

  return useQuery<
    UserData,
    AxiosError<{ message: string }>,
    UserData,
    ["currentUser"]
  >({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await apiClient.get<UserData>("/auth/me");
      return data;
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount, error) => {
      if (error.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

export function useUpdatePatient(): UseMutationResult<
  UserData,
  AxiosError<{ message: string }>,
  UpdatePatientData,
  { previousData: UserData | undefined }
> {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (updateData: UpdatePatientData) => {
      const { data } = await apiClient.put<UserData>(
        `/patients/${user?._id}`,
        updateData
      );
      return data;
    },
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["currentUser"] });
      const previousData = queryClient.getQueryData<UserData>(["currentUser"]);
      if (previousData) {
        queryClient.setQueryData<UserData>(["currentUser"], (old) => ({
          ...old!,
          ...newData,
        }));
      }

      return { previousData };
    },
    onSuccess: (data) => {
      toast.success("Profile updated successfully");
      queryClient.setQueryData(["currentUser"], data);
    },
    onError: (error, _, context) => {
      const errorMessage = error.response?.data.message || "Update failed";
      toast.error(errorMessage);

      if (context?.previousData) {
        queryClient.setQueryData(["currentUser"], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}
