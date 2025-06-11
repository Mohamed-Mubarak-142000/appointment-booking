import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type AppointmentStats,
  type DashboardStats,
  type DoctorSlotsResponse,
  type PatientStats,
  type RatingStats,
  type RevenueStats,
} from "../types";
import { doctorApiClient } from "../../api-client";

export const useDashboardStats = () => {
  return useQuery<DashboardStats>({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const response = await doctorApiClient.get("/doctors/stats");
      return response.data.data;
    },
  });
};

export const useAppointmentStats = () => {
  return useQuery<AppointmentStats>({
    queryKey: ["appointment-stats"],
    queryFn: async () => {
      const response = await doctorApiClient.get("/doctors/appointments/stats");
      return response.data.data;
    },
  });
};

export const usePatientStats = () => {
  return useQuery<PatientStats>({
    queryKey: ["patient-stats"],
    queryFn: async () => {
      const response = await doctorApiClient.get("/doctors/patients/stats");
      return response.data;
    },
  });
};

export const useRevenueStats = () => {
  return useQuery<RevenueStats>({
    queryKey: ["revenue-stats"],
    queryFn: async () => {
      const response = await doctorApiClient.get("/doctors/revenue/stats");
      return response.data;
    },
  });
};

export const useRatingStats = () => {
  return useQuery<RatingStats>({
    queryKey: ["rating-stats"],
    queryFn: async () => {
      const response = await doctorApiClient.get("/doctors/rating/stats");
      return response.data;
    },
  });
};

interface AvailableSlotsStats {
  available: number;
  unavailable: number;
}

export const useAvailableSlotsStats = () => {
  return useQuery<AvailableSlotsStats>({
    queryKey: ["available-slots-stats"],
    queryFn: async () => {
      const response = await doctorApiClient.get(
        "/doctors/available-slots/stats"
      );
      return response.data.data;
    },
  });
};

/********************* */

export const useAvailableSlots = (doctorId: string) => {
  return useQuery({
    queryKey: ["available-slots", doctorId],
    queryFn: async () => {
      const response = await doctorApiClient.get<DoctorSlotsResponse>(
        `/doctors/all-slots/${doctorId}`
      );
      return response.data.data;
    },
  });
};

export const useAddAvailableSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      day: string;
      startTime: string;
      endTime: string;
      slotDuration?: number;
    }) => {
      const response = await doctorApiClient.post("/doctors/slots", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["available-slots"] });
    },
  });
};

export const useUpdateAvailableSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async ({ slotId, data }: { slotId: string; data: any }) => {
      const response = await doctorApiClient.put(
        `/doctors/slots/${slotId}`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["available-slots"] });
    },
  });
};

export const useDeleteAvailableSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (slotId: string) => {
      const response = await doctorApiClient.delete(`/doctors/slots/${slotId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["available-slots"] });
    },
  });
};

export const useUpdateIsAvailabilitySlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (slotId: string) => {
      const response = await doctorApiClient.put(
        `/doctors/slots/${slotId}/availability`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["available-slots"] });
    },
  });
};
