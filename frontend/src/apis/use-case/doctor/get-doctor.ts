import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { DoctorData } from "../types";
import { doctorApiClient } from "../../api-client";

interface DoctorResponse {
  success: boolean;
  data: DoctorData;
}

export function useGetDoctor(
  id: string,
  options?: { enabled?: boolean }
): UseQueryResult<DoctorResponse, AxiosError> {
  return useQuery({
    queryKey: ["doctor", id],
    queryFn: async () => {
      const { data } = await doctorApiClient.get<DoctorResponse>(
        `/doctors/doctor-details/${id}`
      );
      return data;
    },
    enabled: options?.enabled !== false && !!id, // Only fetch if ID exists
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}
