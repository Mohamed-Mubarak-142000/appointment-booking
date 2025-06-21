import {
  Box,
  Button,
  TextField,
  CircularProgress,
  Paper,
  Grid,
  InputAdornment,
  IconButton,
  Avatar,
  Typography,
} from "@mui/material";
import { useTranslate } from "../../locales";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { DoctorData } from "../../apis/use-case/types";
import { useEffect, useState, useRef } from "react";
import { useUpdateDoctorProfile } from "../../apis/use-case/doctor/profile";
import {
  doctorUpdateSchema,
  type DoctorUpdateFormData,
} from "../../schemas/doctor-schema";
import MapSelector from "../map/map-selector";

const ProfileForm = ({ user }: { user: DoctorData }) => {
  const { t } = useTranslate("profile");
  const [showMap, setShowMap] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(
    user.location
      ? {
          lat: user.location.lat,
          lng: user.location.lng,
          address: user.address || "",
        }
      : null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateDoctor, isPending } = useUpdateDoctorProfile();
  console.log("user", user);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type and size
      if (!file.type.match("image.*")) {
        alert(t("profile.image_type_error"));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(t("profile.image_size_error"));
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Update form value
      setValue("photo", file, { shouldDirty: true });
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setValue("photo", undefined, { shouldDirty: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: DoctorUpdateFormData) => {
    if (!user?._id) return;

    const formData = new FormData();

    // أضف كل الحقول إلى الـ FormData
    formData.append("name", data?.name ?? "");
    formData.append("email", data?.email ?? "");
    formData.append("phone", data?.phone ?? "");
    formData.append("age", String(data?.age ?? ""));
    formData.append("specialty", data?.specialty ?? "");
    formData.append("governorate", data.governorate ?? "");
    formData.append("address", data.address ?? "");
    formData.append("bio", data.bio ?? "");
    formData.append("experience", String(data.experience ?? ""));
    formData.append("gender", data.gender ?? "");

    if (data.photo instanceof File) {
      formData.append("photo", data.photo);
    }

    if (data.location) {
      formData.append("location[lat]", String(data.location.lat));
      formData.append("location[lng]", String(data.location.lng));
    }

    updateDoctor({ _id: user._id, data: formData });
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isSubmitting },
    reset,
  } = useForm<DoctorUpdateFormData>({
    resolver: zodResolver(doctorUpdateSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldUnregister: true,
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      age: user.age || undefined,
      specialty: user.specialty || "",
      governorate: user.governorate || "",
      address: user.address || "",
      bio: user.bio || "",
      experience: user.experience || 0,
      photo: undefined,
      location: user.location || { lat: 0, lng: 0 },
    },
  });

  const handleLocationSelect = (location: {
    lat: number;
    lng: number;
    address: string;
  }) => {
    setValue("address", location.address, { shouldDirty: true });
    setValue(
      "location",
      { lat: location.lat, lng: location.lng },
      { shouldDirty: true }
    );
    setSelectedLocation(location);
    setShowMap(false);
  };

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        age: user.age || undefined,
        specialty: user.specialty || "",
        governorate: user.governorate || "",
        address: user.address || "",
        bio: user.bio || "",
        experience: user.experience || 0,
        location: user.location || { lat: 0, lng: 0 },
        photo: undefined,
      });
      setPreviewImage(user.photo || null);
    }
  }, [user, reset]);

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          {/* Avatar and Image Upload */}
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "center", mb: 2 }}
          >
            <Box sx={{ position: "relative", textAlign: "center" }}>
              <Avatar
                src={previewImage || user.photo || "/default-avatar.png"}
                sx={{
                  width: 120,
                  height: 120,
                  cursor: "pointer",
                  "&:hover": { opacity: 0.8 },
                }}
                onClick={handleAvatarClick}
              />

              <IconButton
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "primary.main",
                  "&:hover": { backgroundColor: "primary.dark" },
                }}
                onClick={handleAvatarClick}
              >
                <AddAPhotoIcon sx={{ color: "white" }} />
              </IconButton>
              {previewImage && (
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    backgroundColor: "error.main",
                    "&:hover": { backgroundColor: "error.dark" },
                  }}
                  onClick={handleRemoveImage}
                >
                  <DeleteIcon sx={{ color: "white" }} />
                </IconButton>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: "none" }}
              />
              {errors.photo && (
                <Typography
                  color="error"
                  variant="caption"
                  display="block"
                  mt={1}
                >
                  {errors.photo?.message}
                </Typography>
              )}
            </Box>
          </Grid>

          {/* Other form fields */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t("doctor_profile.name")}
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t("doctor_profile.email")}
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputLabelProps={{ shrink: true }}
              disabled
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t("doctor_profile.phone")}
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder={t(
                "register_form.doctor_register.address_placeholder"
              )}
              error={!!errors.address}
              helperText={errors.address?.message}
              value={selectedLocation?.address || ""}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowMap(true)}>
                      <LocationOnIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <MapSelector
            open={showMap}
            onSelect={handleLocationSelect}
            onClose={() => setShowMap(false)}
            initialLocation={selectedLocation || undefined}
          />

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t("doctor_profile.age")}
              type="number"
              {...register("age", { valueAsNumber: true })}
              error={!!errors.age}
              helperText={errors.age?.message}
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { min: 1, max: 120 } }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t("doctor_profile.specialty")}
              {...register("specialty")}
              error={!!errors.specialty}
              helperText={errors.specialty?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <TextField
              fullWidth
              label={t("doctor_profile.governorate")}
              {...register("governorate")}
              error={!!errors.governorate}
              helperText={errors.governorate?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <TextField
              fullWidth
              label={t("doctor_profile.experience")}
              type="number"
              {...register("experience", { valueAsNumber: true })}
              error={!!errors.experience}
              helperText={errors.experience?.message}
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <TextField
              fullWidth
              label={t("doctor_profile.gender")}
              select
              SelectProps={{ native: true }}
              {...register("gender")}
              error={!!errors.gender}
              helperText={errors.gender?.message}
              InputLabelProps={{ shrink: true }}
            >
              <option value=""></option>
              <option value="male">{t("doctor_profile.gender_male")}</option>
              <option value="female">
                {t("doctor_profile.gender_female")}
              </option>
              <option value="other">{t("doctor_profile.gender_other")}</option>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t("doctor_profile.bio")}
              multiline
              rows={3}
              {...register("bio")}
              error={!!errors.bio}
              helperText={errors.bio?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
            width: "100%",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isDirty || isSubmitting || isPending}
            sx={{ minWidth: 300, p: 1.5 }}
          >
            {isPending ? (
              <CircularProgress size={22} sx={{ color: "primary.darker" }} />
            ) : (
              t("doctor_profile.save_changes")
            )}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProfileForm;
