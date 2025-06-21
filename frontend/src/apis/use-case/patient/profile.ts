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
import type { CreateAppointmentData, PatientData } from "../types";
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
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return useMutation({
    mutationFn: async (updateData: UpdatePatientData) => {
      const { data } = await patientApiClient.put<PatientData>(
        `/patients/${updateData._id}`,
        updateData,
        config
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

export const useGetPatientStats = () => {
  return useQuery({
    queryKey: ["patientStats"],
    queryFn: async () => {
      const response = await patientApiClient.get("/dashboard/stats");
      return response.data;
    },
  });
};

export const useSearchDoctors = (query: string) => {
  return useQuery({
    queryKey: ["doctorSearch", query],
    queryFn: async () => {
      const response = await patientApiClient.get(`/doctors/search?q=${query}`);
      return response.data;
    },
    enabled: query.length > 2,
  });
};

export const useBookAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateAppointmentData) => {
      const response = await patientApiClient.post("/appointments", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patientAppointments"] });
      queryClient.invalidateQueries({ queryKey: ["patientStats"] });
    },
  });
};

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await patientApiClient.put(`/appointments/${id}/cancel`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patientAppointments"] });
      queryClient.invalidateQueries({ queryKey: ["patientStats"] });
    },
  });
};
