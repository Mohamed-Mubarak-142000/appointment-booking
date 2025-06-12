import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type AppointmentStats,
  type DashboardStats,
  type DoctorSlotsResponse,
  type PatientStats,
  type RatingStats,
  type RevenueStats,
  type SlotType,
} from "../types";
import { doctorApiClient } from "../../api-client";
import { toast } from "react-toastify";

interface AvailableSlotsStats {
  available: number;
  unavailable: number;
}

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

export const useAvailableSlots = ({
  id,
  showAll = false,
}: {
  id: string;
  showAll?: boolean;
}) => {
  return useQuery({
    queryKey: ["available-slots", id],
    queryFn: async () => {
      const response = await doctorApiClient.get<DoctorSlotsResponse>(
        `/doctors/all-slots/${id}?showAll=${showAll}`
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
      type: SlotType;
    }) => {
      const response = await doctorApiClient.post("/doctors/slots", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["available-slots"] });
      toast.success("Slot added successfully");
    },
    onError: () => {
      console.error("Error adding slot:");
      toast.error("Failed to add slot");
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
      toast.success("Slot updated successfully");
      queryClient.invalidateQueries({ queryKey: ["available-slots"] });
    },
    onError: () => {
      toast.error("Failed to update slot");
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
      toast.success("Slot deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["available-slots"] });
    },
    onError: () => {
      toast.error("Failed to delete slot");
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
      toast.success("Slot updated successfully");
      queryClient.invalidateQueries({ queryKey: ["available-slots"] });
    },
    onError: () => {
      toast.error("Failed to update slot");
    },
  });
};
