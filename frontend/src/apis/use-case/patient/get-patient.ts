import { useQuery } from "@tanstack/react-query";
import { patientApiClient } from "../../api-client";
import type { BaseUser } from "../types";

interface PatientDetailsResponse {
  data: BaseUser;
  success: boolean;
}
export const useGetPatientDetails = (patientId: string) => {
  return useQuery({
    queryKey: ["patient-details", patientId],
    queryFn: async () => {
      const response = await patientApiClient.get<PatientDetailsResponse>(
        `/patients/patient-details/${patientId}`
      );
      return response.data;
    },
  });
};
