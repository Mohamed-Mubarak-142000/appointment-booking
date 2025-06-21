import {
  useMutation,
  type UseMutationResult,
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import type { DoctorData, UpdateDoctorData } from "../types";
import { doctorApiClient } from "../../api-client";
import { getErrorMessage } from "./auth";

export function useGetDoctorProfile(): UseQueryResult<DoctorData, AxiosError> {
  return useQuery({
    queryKey: ["doctorProfile"],
    queryFn: async () => {
      const { data } = await doctorApiClient.get<DoctorData>("/auth/doctor/me");
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useUpdateDoctorProfile(): UseMutationResult<
  DoctorData,
  AxiosError,
  UpdateDoctorData
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updateData: UpdateDoctorData) => {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await doctorApiClient.put<DoctorData>(
        `/doctors/${updateData._id}`,
        updateData.data,
        config
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["doctorProfile"],
        refetchType: "active",
      });
      toast.success("Doctor profile updated successfully");
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message || "Failed to update doctor profile");
    },
  });
}
