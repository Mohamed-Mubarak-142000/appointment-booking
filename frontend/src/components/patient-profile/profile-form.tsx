import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Grid,
  Divider,
  Avatar,
  IconButton,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTranslate } from "../../locales";
import { useUpdatePatientProfile } from "../../apis/use-case/patient/profile";
import type { PatientData } from "../../apis/use-case/types";
import {
  updateProfileSchema,
  type UpdateProfileFormData,
} from "../../schemas/patient-schema";
import type { UpdatePatientData } from "../../types";

const ProfileForm = ({ user }: { user: PatientData }) => {
  const { t } = useTranslate("profile");
  const { mutate: updatePatient, isPending } = useUpdatePatientProfile();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    reset,
    setValue,
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldUnregister: true,
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      // phone: user.phone || "",
      age: user.age || undefined,
      gender:
        user.gender === "male" ||
        user.gender === "female" ||
        user.gender === "other"
          ? user.gender
          : undefined,
      photo: undefined,
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.match("image.*")) {
        alert(t("image_type_error"));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(t("image_size_error"));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
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

  const onSubmit = (data: UpdateProfileFormData) => {
    if (!user?._id) return;

    const formData = new FormData();
    formData.append("_id", user._id);
    formData.append("name", data.name || "");
    formData.append("email", data.email || "");
    // formData.append("phone", data.phone || "");
    formData.append("age", String(data.age || ""));
    formData.append("gender", data.gender || "");

    if (data.photo instanceof File) {
      formData.append("photo", data.photo);
    }

    updatePatient(formData as unknown as UpdatePatientData);
  };

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        age: user.age || undefined,
        gender: user.gender || undefined,
        photo: user.photo || undefined,
      });
      setPreviewImage(null);
    }
  }, [user, reset]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 4 }}
    >
      <Typography variant="h5" gutterBottom>
        {t("profile_info")}
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2}>
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
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/default-avatar.png";
              }}
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
                {errors.photo.message}
              </Typography>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label={t("name")}
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label={t("email")}
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
            label={t("age")}
            type="number"
            {...register("age", { valueAsNumber: true })}
            error={!!errors.age}
            helperText={errors.age?.message}
            InputLabelProps={{ shrink: true }}
            InputProps={{ inputProps: { min: 1, max: 120 } }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label={t("gender")}
            select
            SelectProps={{ native: true }}
            {...register("gender")}
            error={!!errors.gender}
            helperText={errors.gender?.message}
            InputLabelProps={{ shrink: true }}
          >
            <option value=""></option>
            <option value="male">{t("gender_male")}</option>
            <option value="female">{t("gender_female")}</option>
            <option value="other">{t("gender_other")}</option>
          </TextField>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isDirty || isSubmitting || isPending}
          sx={{ minWidth: 120 }}
        >
          {isPending ? (
            <CircularProgress size={22} sx={{ color: "primary.darker" }} />
          ) : (
            t("save_changes")
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileForm;
