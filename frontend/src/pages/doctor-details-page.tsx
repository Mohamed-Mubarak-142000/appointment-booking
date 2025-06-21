import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { assets } from "../assets/assets_frontend/assets";
import DoctorInfo from "../components/doctor-details/doctor-info";
import { useParams } from "react-router-dom";
import { useGetDoctor } from "../apis/use-case/doctor/get-doctor";
import { EmptyStateContent } from "../components/empty-state-content";
import AvailableSlotsDoctor from "../components/doctor-details/available-slots";
import ShowVideoAndAppointmentBooking from "../components/doctor-details/show-video-appointment-booking";
import { PatientsComments } from "../components/doctor-details/comments";
import TitleSection from "../components/title-section";
import { useGetAvailableSlotsForPatient } from "../apis/use-case/doctor/get-available-slots";
import { formatDateTimeByLang, useTranslate } from "../locales";
import DoctorMapView from "../components/overview/charts/doctor-map-view";
import { useState } from "react";
import { ErrorStateContent } from "../components/error-state-content";
import ButtonAction from "../components/button-action";

const DoctorDetailsPage = () => {
  const { id } = useParams();
  const { t } = useTranslate("appointment");
  const [openDialog, setDialog] = useState(false);
  const { data, isPending } = useGetDoctor(id || "", {
    enabled: !!id,
  });

  const { data: availableSlots, isPending: isPendingAvailableSlots } =
    useGetAvailableSlotsForPatient({
      id: id || "",
      showAll: false,
    });

  const lat = data?.data?.location?.lat;
  const lng = data?.data?.location?.lng;

  if (!id) {
    return (
      <EmptyStateContent
        title={t("doctorNotFound.title")}
        subtitle={t("doctorNotFound.subtitle")}
      />
    );
  }

  if (isPending) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <CircularProgress size={30} sx={{ color: "primary.darker" }} />
      </Box>
    );
  }

  if (!data?.data) {
    return (
      <EmptyStateContent
        title={t("doctorNotFound.title")}
        subtitle={t("doctorNotFound.subtitle")}
      />
    );
  }

  // Check location only after we have data
  if (typeof lat !== "number" || typeof lng !== "number") {
    return (
      <ErrorStateContent
        icon="material-symbols:error-outline-rounded"
        title={t("locationError.title")}
        subtitle={t("locationError.subtitle")}
      />
    );
  }

  const markerLocation = { lat, lng };

  return (
    <>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={12} md={6} lg={4}>
          <Box
            component={"img"}
            src={data.data.photo || assets.doc1}
            alt="Doctor"
            sx={{ width: "100%", height: "auto", borderRadius: 1 }}
          />
        </Grid>

        <DoctorInfo>
          <DoctorInfo.Row>
            <DoctorInfo.Item>
              <DoctorInfo.Label>{t("doctorInfo.name")}</DoctorInfo.Label>
              <DoctorInfo.Value>{data.data.name}</DoctorInfo.Value>
            </DoctorInfo.Item>

            <DoctorInfo.Item>
              <DoctorInfo.Label>
                {t("doctorInfo.specialization")}
              </DoctorInfo.Label>
              <DoctorInfo.Value>{data.data.specialty}</DoctorInfo.Value>
            </DoctorInfo.Item>
          </DoctorInfo.Row>

          <DoctorInfo.Row>
            <DoctorInfo.Item>
              <DoctorInfo.Label>{t("doctorInfo.experience")}</DoctorInfo.Label>
              <DoctorInfo.Value>{`${data.data.experience} ${t(
                "years"
              )}`}</DoctorInfo.Value>
            </DoctorInfo.Item>

            <DoctorInfo.Item>
              <DoctorInfo.Label>{t("doctorInfo.contact")}</DoctorInfo.Label>
              <DoctorInfo.Value>{data.data.phone}</DoctorInfo.Value>
            </DoctorInfo.Item>
          </DoctorInfo.Row>

          <DoctorInfo.Row>
            <DoctorInfo.Item>
              <DoctorInfo.Label>{t("doctorInfo.location")}</DoctorInfo.Label>
              <Button
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.lighter,
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.primary.light,
                  },
                }}
                onClick={() => setDialog(true)}
              >
                <DoctorInfo.Value>{data.data.address}</DoctorInfo.Value>
              </Button>
            </DoctorInfo.Item>

            <DoctorInfo.Item>
              <DoctorInfo.Label>{t("doctorInfo.governorate")}</DoctorInfo.Label>
              <DoctorInfo.Value>{data.data.governorate}</DoctorInfo.Value>
            </DoctorInfo.Item>
          </DoctorInfo.Row>

          <DoctorInfo.Row>
            <DoctorInfo.Item>
              <DoctorInfo.Label>{t("doctorInfo.age")}</DoctorInfo.Label>
              <DoctorInfo.Value>{data.data.age}</DoctorInfo.Value>
            </DoctorInfo.Item>

            <DoctorInfo.Item>
              <DoctorInfo.Label>{t("doctorInfo.joinedAt")}</DoctorInfo.Label>
              <DoctorInfo.Value>
                {formatDateTimeByLang(data.data.createdAt)}
              </DoctorInfo.Value>
            </DoctorInfo.Item>
          </DoctorInfo.Row>

          <DoctorInfo.Item>
            <DoctorInfo.Label>{t("doctorInfo.biography")}</DoctorInfo.Label>
            <DoctorInfo.Value>
              {data.data.bio || t("doctorInfo.noBio")}
            </DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo>
      </Grid>

      <TitleSection
        title={t("availableSlots.title")}
        subTitle={t("availableSlots.subtitle")}
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

      <AvailableSlotsDoctor
        data={availableSlots?.slots || []}
        isPending={isPendingAvailableSlots}
      />

      <ShowVideoAndAppointmentBooking doctorId={id} data={availableSlots!} />

      <PatientsComments doctorId={id} />

      <Dialog
        open={openDialog}
        onClose={() => setDialog(false)}
        fullWidth
        sx={{ p: 0, m: 0, overflow: "hidden" }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontSize: { xs: ".5rem", md: ".8rem", lg: "1rem" },
            color: (theme) => theme.palette.primary.darker,
          }}
        >
          {data.data.address}
        </DialogTitle>
        <DialogContent
          sx={{
            p: 0,
            overflow: "hidden",
            height: 500,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <DoctorMapView markerLocation={markerLocation} />
          </Box>
        </DialogContent>

        <DialogActions>
          <ButtonAction
            title={t("mapDialog.close")}
            onClick={() => setDialog(false)}
            slotProps={{
              button: {
                sx: {
                  fontSize: { xs: ".5rem", md: ".5rem", lg: ".8rem" },
                  color: (theme) => theme.palette.common.white,
                  backgroundColor: (theme) => theme.palette.primary.dark,
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.primary.darker,
                  },
                },
              },
            }}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DoctorDetailsPage;
