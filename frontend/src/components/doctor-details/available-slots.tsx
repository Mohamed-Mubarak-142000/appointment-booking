import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { Iconify } from "../iconify";
import type { AvailableSlot } from "../../apis/use-case/types";
import { useTranslate } from "../../locales";

const AvailableSlotsDoctor = ({
  data,
  isPending,
}: {
  data: AvailableSlot[];
  isPending: boolean;
}) => {
  const { t } = useTranslate("appointment");
  if (isPending) {
    return <CircularProgress size={24} sx={{ color: "primary.darker" }} />;
  }

  if (!data || !data?.length) {
    return (
      <Box sx={{ textAlign: "center", padding: 2 }}>
        <Typography variant="body1">{t("availableSlots.noSlots")}</Typography>
      </Box>
    );
  }

  return (
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
      {data?.map((slot) => (
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
              <Typography variant="h6">
                {t("availableSlots.dayLabel")}
              </Typography>
              <Typography variant="body1">{slot.day}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="h6">
                {t("availableSlots.startTimeLabel")}
              </Typography>
              <Typography variant="body1">{slot.startTime}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="h6">
                {t("availableSlots.endTimeLabel")}
              </Typography>
              <Typography variant="body1">{slot.endTime}</Typography>
            </Box>
          </Stack>
        </Stack>
      ))}
    </Box>
  );
};

export default AvailableSlotsDoctor;
