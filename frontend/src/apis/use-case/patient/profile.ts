import {
  useMutation,
  type UseMutationResult,
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import type { UpdatePatientData } from "../../../types";
import { getErrorMessage } from "../doctor/auth";
import type { PatientData } from "../types";
import { patientApiClient } from "../../api-client";

export function useGetPatientProfile(): UseQueryResult<
  PatientData,
  AxiosError
> {
  return useQuery({
    queryKey: ["patientProfile"],
    queryFn: async () => {
      const { data } = await patientApiClient.get<PatientData>(
        "/auth/patient/me"
      );
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useUpdatePatientProfile(): UseMutationResult<
  PatientData,
  AxiosError,
  UpdatePatientData
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updateData: UpdatePatientData) => {
      const { data } = await patientApiClient.put<PatientData>(
        `/patients/${updateData._id}`,
        updateData
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["patientProfile"],
        refetchType: "active",
      });
      toast.success("Patient profile updated successfully");
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message || "Failed to update patient profile");
    },
  });
}
