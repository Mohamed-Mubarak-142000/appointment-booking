import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { doctorApiClient, patientApiClient } from "../../api-client";
import { toast } from "react-toastify";

interface AppointmentData {
  doctor: string;
  slot: string;
  patient: string;
  type: string;
  reason: string;
  day: string;
  startTime: string;
  endTime: string;
  price: number;
}

export interface UpdateStatusData {
  status: "confirmed" | "cancelled" | "completed";
}

type Patient = {
  _id: string;
  name: string;
  email: string;
  phone: string;
};

export type AppointmentRaw = {
  _id: string;
  doctor: string;
  patient: Patient;
  slot: string;
  type: string;
  reason: string;
  day: string;
  startTime: string;
  endTime: string;
  price: number;
  status: "confirmed" | "cancelled" | "completed" | "pending"; // match your backend status values
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string; // string duplicate of _id?
};

type AppointmentsResponse = {
  success: boolean;
  count: number;
  data: AppointmentRaw[];
};

export type ArchivedAppointmentRaw = {
  _id: string;
  originalAppointmentId: string;
  doctor: {
    _id: string;
    name: string;
  };
  patient: {
    _id: string;
    name: string;
    phone: string;
  };
  type: string;
  reason: string;
  day: string;
  startTime: string;
  endTime: string;
  price: number;
  doctorName: string;
  patientName: string;
  patientPhone: string;
  completedAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type ArchivedAppointmentsResponse = {
  success: boolean;
  count: number;
  data: ArchivedAppointmentRaw[];
};

export type AppointmentRow = {
  _id: string;
  patientName: string;
  type: string;
  day: string;
  startTime: string;
  endTime: string;
  status?: string;
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (appointmentData: AppointmentData) => {
      try {
        const response = await patientApiClient.post(
          "/appointments",
          appointmentData
        );
        return response.data;
      } catch {
        throw new Error("فشل في حجز الموعد");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor-available-slots"] });
      queryClient.invalidateQueries({ queryKey: ["patient-appointments"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useGetDoctorAppointments = (doctorId: string) => {
  return useQuery({
    queryKey: ["doctor-appointments", doctorId],
    queryFn: async () => {
      try {
        const response = await doctorApiClient.get<AppointmentsResponse>(
          `/appointments/doctor/${doctorId}`
        );
        return response.data;
      } catch {
        toast.error("فشل في جلب مواعيد الطبيب");
        throw new Error("فشل في جلب مواعيد الطبيب");
      }
    },
    enabled: !!doctorId, // يتم تشغيل الاستعلام فقط عندما يكون doctorId موجودًا
  });
};

export const useUpdateAppointmentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      appointmentId,
      status,
    }: {
      appointmentId: string;
      status: UpdateStatusData;
    }) => {
      try {
        const response = await doctorApiClient.patch(
          `/appointments/${appointmentId}/status`,
          { status }
        );
        return response.data;
      } catch {
        toast.error("فشل في تحديث حالة الموعد");
        throw new Error("فشل في تحديث حالة الموعد");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor-appointments"] });
      toast.success("تم تحديث حالة الموعد بنجاح");
    },
  });
};

export const useGetCompletedAppointments = ({
  doctorId,
  patientName,
}: {
  doctorId: string;
  patientName?: string;
}) => {
  return useQuery({
    queryKey: ["completed-appointments", doctorId, patientName],
    queryFn: async () => {
      try {
        const response =
          await doctorApiClient.get<ArchivedAppointmentsResponse>(
            `/appointments/archive/${doctorId}?patientName=${patientName}`
          );
        return response.data;
      } catch (error) {
        toast.error("فشل في البحث في المواعيد المكتملة");
        if (error instanceof Error) {
          throw error;
        }
        throw new Error("فشل في البحث في المواعيد المكتملة");
      }
    },
  });
};

export const useDoctorPatients = (doctorId: string, search: string) => {
  return useQuery({
    queryKey: ["doctorPatients", doctorId, search],
    queryFn: async () => {
      const response = await doctorApiClient.get(
        `/appointments/doctor/${doctorId}/patients`,
        {
          params: { search },
        }
      );
      return response.data.data;
    },
    enabled: !!doctorId, // لا ينفذ الاستعلام إلا إذا كان معرف الطبيب موجود
  });
};

export const useGetAppointmentDetails = (appointmentId: string) => {
  return useQuery({
    queryKey: ["appointment-details", appointmentId],
    queryFn: async () => {
      const response = await patientApiClient.get<AppointmentsResponse>(
        `/appointments/appointment-details/${appointmentId}`
      );
      return response.data;
    },
  });
};
