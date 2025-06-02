import { Typography } from "@mui/material";
import type { DoctorData } from "../../apis/use-case/types";

const DoctorInfo = ({ doctor }: { doctor: DoctorData }) => {
  return (
    <>
      <Typography
        variant="h3"
        sx={{
          fontSize: { xs: "0.8rem", md: "1rem", lg: "1.2rem" },
          fontWeight: (theme) => theme.typography.fontWeightBold,
          color: "inherit", // يرث اللون من الأب (يصبح أبيض عند hover)
        }}
      >
        {doctor.name}
      </Typography>

      <Typography
        variant="h3"
        sx={{
          fontSize: { xs: "0.8rem", md: "1rem", lg: "1.2rem" },
          fontWeight: (theme) => theme.typography.fontWeightBold,
          color: "inherit", // يرث اللون من الأب (يصبح أبيض عند hover)
        }}
      >
        {doctor.specialty}
      </Typography>
    </>
  );
};

export default DoctorInfo;
