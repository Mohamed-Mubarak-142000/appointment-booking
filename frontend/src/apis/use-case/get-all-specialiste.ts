// src/hooks/api/useSpecialties.ts
import { useQuery } from "@tanstack/react-query";
import { doctorApiClient } from "../api-client";

// src/types.ts
export interface Specialty {
  id: string;
  value: string;
  label: {
    en: string;
    ar: string;
  };
}

interface SpecialtiesResponse {
  success: boolean;
  data: Specialty[];
}

export function useSpecialties() {
  return useQuery<SpecialtiesResponse>({
    queryKey: ["specialties"],
    queryFn: async () => {
      const { data } = await doctorApiClient.get<SpecialtiesResponse>(
        "/specialties"
      );
      return data;
    },
    staleTime: 60 * 60 * 1000, // 1 hour cache
  });
}
