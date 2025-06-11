// src/components/dashboard/charts/AppointmentStatusChart.tsx
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Typography } from "@mui/material";
import type { Appointment } from "../../../apis/use-case/types";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

interface AppointmentStatusChartProps {
  appointments: Appointment[];
}

const AppointmentStatusChart = ({
  appointments,
}: AppointmentStatusChartProps) => {
  const statusCounts = {
    pending: appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    cancelled: appointments.filter((a) => a.status === "cancelled").length,
    completed: appointments.filter((a) => a.status === "completed").length,
  };

  const data = {
    labels: ["Pending", "Confirmed", "Cancelled", "Completed"],
    datasets: [
      {
        label: "Appointments by Status",
        data: [
          statusCounts.pending,
          statusCounts.confirmed,
          statusCounts.cancelled,
          statusCounts.completed,
        ],
        backgroundColor: [
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Appointment Status Distribution
      </Typography>
      <PolarArea data={data} />
    </>
  );
};

export default AppointmentStatusChart;
