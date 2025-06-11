import {
  // useMutation,
  useQuery,
  // useQueryClient,
  type UseQueryResult,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { AvailableSlot } from "../types";
import { doctorApiClient } from "../../api-client";

interface DoctorResponse {
  success: boolean;
  data: AvailableSlot[];
}

export function useGetAvailableSlots({
  id,
  options,
}: {
  id: string;
  options?: { enabled?: boolean };
}): UseQueryResult<DoctorResponse, AxiosError> {
  return useQuery({
    queryKey: ["available-slots", id],
    queryFn: async () => {
      const { data } = await doctorApiClient.get<DoctorResponse>(
        `/doctors/${id}/slots`
      );
      return data;
    },
    enabled: options?.enabled !== false && !!id, // Only fetch if ID exists
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// export const useAvailableSlots = () => {
//   return useQuery({
//     queryKey: ["available-slots"],
//     queryFn: async () => {
//       const response = await doctorApiClient.get("/doctors/slots");
//       return response.data.data;
//     },
//   });
// };

// export const useAddAvailableSlot = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (data: {
//       day: string;
//       startTime: string;
//       endTime: string;
//       slotDuration?: number;
//     }) => {
//       const response = await doctorApiClient.post("/doctors/slots", data);
//       return response.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["available-slots"] });
//     },
//   });
// };

// export const useUpdateAvailableSlot = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     mutationFn: async ({ slotId, data }: { slotId: string; data: any }) => {
//       const response = await doctorApiClient.put(
//         `/doctors/slots/${slotId}`,
//         data
//       );
//       return response.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["available-slots"] });
//     },
//   });
// };

// export const useDeleteAvailableSlot = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (slotId: string) => {
//       const response = await doctorApiClient.delete(`/doctors/slots/${slotId}`);
//       return response.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["available-slots"] });
//     },
//   });
// };
