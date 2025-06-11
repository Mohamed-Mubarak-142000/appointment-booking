import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import type { AvailableSlot } from "../../apis/use-case/types";
import { Iconify } from "../iconify";
import TitleSection from "../title-section";

const AvailableSlotsDoctor = ({
  data,
  isPending,
}: {
  data: AvailableSlot[];
  isPending: boolean;
}) => {
  if (isPending) {
    return <CircularProgress size={24} sx={{ color: "primary.darker" }} />;
  }

  if (!data || !data.length) {
    return (
      <Box sx={{ textAlign: "center", padding: 2 }}>
        <Typography variant="body1">No available slots found.</Typography>
      </Box>
    );
  }

  return (
    <>
      <TitleSection
        title="Available Slots"
        subTitle="Select a slot to book an appointment with the doctor for your convenience."
        slotProps={{
          title: {
            variant: "h3",
            sx: {
              fontSize: { xs: "1.5rem", md: "2rem", lg: "3rem" },
              fontWeight: (theme) => theme.typography.fontWeightBold,
            },
          },
          subTitle: {
            variant: "body1",
            sx: {
              fontSize: { xs: ".5rem", md: ".75rem", lg: "1rem" },
              fontWeight: (theme) => theme.typography.fontWeightRegular,
            },
          },
        }}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(6, 1fr)",
          },
          gap: 2,
        }}
      >
        {data.map((slot) => (
          <Stack
            spacing={1}
            alignItems={"center"}
            sx={{
              padding: 2,
              backgroundColor: (theme) => theme.palette.primary.light,
              borderRadius: 1,
            }}
          >
            <Iconify icon="noto-v1:alarm-clock" width={60} />

            <Stack
              spacing={1}
              sx={{ width: "100%" }}
              alignItems={"start"}
              justifyContent={"start"}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="h6">Day:</Typography>
                <Typography variant="body1">{slot.day}</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="h6">Start Time:</Typography>
                <Typography variant="body1">{slot.startTime}</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="h6">End Time:</Typography>
                <Typography variant="body1">{slot.endTime}</Typography>
              </Box>
            </Stack>
          </Stack>
        ))}
      </Box>
    </>
  );
};

export default AvailableSlotsDoctor;
