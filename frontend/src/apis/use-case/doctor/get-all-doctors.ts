import {
  useQuery,
  type UseQueryResult,
  type QueryFunction,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { DoctorData } from "../types";
import { doctorApiClient } from "../../api-client";

interface GetAllDoctorsParams {
  page?: number;
  limit?: number;
  select?: string;
  sort?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // for other filter params
}

interface DoctorsResponse {
  success: boolean;
  count: number;
  pagination: {
    next?: { page: number; limit: number };
    prev?: { page: number; limit: number };
  };
  data: DoctorData[];
}

export function useGetAllDoctors(
  params: GetAllDoctorsParams = {}
): UseQueryResult<DoctorsResponse, AxiosError> {
  const queryFn: QueryFunction<DoctorsResponse> = async () => {
    const queryParams = new URLSearchParams();

    // Add pagination params
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());

    // Add selection and sorting
    if (params.select) queryParams.append("select", params.select);
    if (params.sort) queryParams.append("sort", params.sort);

    // Add other filter params
    Object.keys(params).forEach((key) => {
      if (!["page", "limit", "select", "sort"].includes(key)) {
        queryParams.append(key, params[key]);
      }
    });

    const { data } = await doctorApiClient.get<DoctorsResponse>(
      `/doctors?${queryParams.toString()}`
    );
    return data;
  };

  return useQuery<DoctorsResponse, AxiosError>({
    queryKey: ["doctors", params],
    queryFn,
    staleTime: 1000 * 60 * 5,
  });
}
