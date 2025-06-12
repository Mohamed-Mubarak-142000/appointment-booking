import { useQuery } from "@tanstack/react-query";
import type { DoctorSlotsResponse } from "../types";
import { patientApiClient } from "../../api-client";

export const useGetAvailableSlotsForPatient = ({
  id,
  showAll = false,
}: {
  id: string;
  showAll?: boolean;
}) => {
  return useQuery({
    queryKey: ["available-slots", id, showAll],
    queryFn: async () => {
      const response = await patientApiClient.get<DoctorSlotsResponse>(
        `/doctors/all-slots/${id}?showAll=${showAll}`
      );
      return response.data.data;
    },
  });
};
