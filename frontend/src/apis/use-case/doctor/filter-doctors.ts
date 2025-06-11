// src/hooks/api/useFilteredDoctors.ts
import { useQuery } from "@tanstack/react-query";
import type { DoctorData } from "../types";
import type { Specialty } from "../get-all-specialiste";
import type { Governorate } from "../get-all-government";
import { doctorApiClient } from "../../api-client";

interface FilterParams {
  specialty?: string;
  governorate?: string;
  name?: string;
  page?: number;
  limit?: number;
}

interface FilteredDoctorsResponse {
  success: boolean;
  count: number;
  total?: number;
  page?: number;
  pages?: number;
  data: DoctorData[];
  metadata?: {
    specialtyInfo?: Specialty;
    governorateInfo?: Governorate;
  };
}

export function useFilteredDoctors(params: FilterParams) {
  return useQuery<FilteredDoctorsResponse>({
    queryKey: ["doctors", params],
    queryFn: async () => {
      const { data } = await doctorApiClient.get<FilteredDoctorsResponse>(
        "/doctors/filter",
        { params }
      );
      return data;
    },
    enabled: !!params.specialty || !!params.governorate || !!params.name,
    staleTime: 5 * 60 * 1000,
  });
}
