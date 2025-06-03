import { useQuery } from "@tanstack/react-query";
import { doctorApiClient } from "../api-client";

// src/types.ts
export interface Governorate {
  id: string;
  value: string;
  label: {
    en: string;
    ar: string;
  };
}

interface GovernoratesResponse {
  success: boolean;
  data: Governorate[];
}

export function useGovernorates() {
  return useQuery<GovernoratesResponse>({
    queryKey: ["governorates"],
    queryFn: async () => {
      const { data } = await doctorApiClient.get<GovernoratesResponse>(
        "/governments"
      );
      return data;
    },
    staleTime: 60 * 60 * 1000, // 1 hour cache
  });
}
