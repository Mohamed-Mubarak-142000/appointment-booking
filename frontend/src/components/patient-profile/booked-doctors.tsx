/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  List,
  Paper,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useTranslate } from "../../locales";
import type { PatientData } from "../../apis/use-case/types";
import { useGetPatientAppointments } from "../../apis/use-case/patient/appointments";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

const BookedDoctors = ({ user }: { user: PatientData }) => {
  const { t } = useTranslate("profile");
  const { data } = useGetPatientAppointments(user._id);
  const [editData, setEditData] = useState<any>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);

  const handleEditClick = (appointment: any) => {
    setEditData(appointment);
    setOpenEditDialog(true);
  };

  const handleViewClick = (appointment: any) => {
    setEditData(appointment);
    setOpenViewDialog(true);
  };

  const handleSave = () => {
    // هنا تضيف منطق حفظ البيانات بعد التعديل
    console.log("Saving:", editData);
    setOpenEditDialog(false);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {t("profile.booked_doctors")}
      </Typography>
      <Divider sx={{ my: 2 }} />

      {data?.data?.length ? (
        <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {data.data.map((appointment: any) => (
            <Card key={appointment._id} variant="outlined">
              <CardContent>
                <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar src={appointment.doctor.photo} />
                  <div>
                    <Typography variant="h6">
                      {appointment.doctor.name}
                    </Typography>
                    <Chip
                      label={appointment.type}
                      size="small"
                      color="primary"
                      sx={{ mt: 0.5 }}
                    />
                  </div>
                </div>

                <Divider sx={{ my: 2 }} />

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <Typography variant="body2" color="text.secondary">
                      اليوم
                    </Typography>
                    <Typography variant="body1">{appointment.day}</Typography>
                  </div>

                  <div>
                    <Typography variant="body2" color="text.secondary">
                      الوقت
                    </Typography>
                    <Typography variant="body1">
                      {appointment.startTime} - {appointment.endTime}
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="body2" color="text.secondary">
                      السعر
                    </Typography>
                    <Typography variant="body1">
                      {appointment.price} جنيه
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="body2" color="text.secondary">
                      الحالة
                    </Typography>
                    <Typography variant="body1">
                      {appointment.status}
                    </Typography>
                  </div>
                </div>
              </CardContent>

              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button
                  size="small"
                  startIcon={<VisibilityIcon />}
                  onClick={() => handleViewClick(appointment)}
                >
                  عرض
                </Button>
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() => handleEditClick(appointment)}
                >
                  تعديل
                </Button>
              </CardActions>
            </Card>
          ))}
        </List>
      ) : (
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          py={4}
        >
          {t("profile.no_booked_doctors")}
        </Typography>
      )}

      {/* Edit Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        fullWidth
      >
        <DialogTitle>تعديل الموعد</DialogTitle>
        <DialogContent>
          {editData && (
            <>
              <TextField
                margin="dense"
                label="السبب"
                fullWidth
                variant="outlined"
                value={editData.reason}
                onChange={(e) =>
                  setEditData({ ...editData, reason: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="الحالة"
                fullWidth
                variant="outlined"
                value={editData.status}
                onChange={(e) =>
                  setEditData({ ...editData, status: e.target.value })
                }
                select
                SelectProps={{
                  native: true,
                }}
              >
                <option value="confirmed">مؤكد</option>
                <option value="pending">قيد الانتظار</option>
                <option value="cancelled">ملغى</option>
              </TextField>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>إلغاء</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            حفظ
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Dialog */}
      <Dialog
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        fullWidth
      >
        <DialogTitle>تفاصيل الموعد</DialogTitle>
        <DialogContent>
          {editData && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <div>
                <Typography variant="body2" color="text.secondary">
                  اسم الطبيب
                </Typography>
                <Typography variant="body1">{editData.doctor.name}</Typography>
              </div>

              <div>
                <Typography variant="body2" color="text.secondary">
                  نوع الموعد
                </Typography>
                <Typography variant="body1">{editData.type}</Typography>
              </div>

              <div>
                <Typography variant="body2" color="text.secondary">
                  اليوم
                </Typography>
                <Typography variant="body1">{editData.day}</Typography>
              </div>

              <div>
                <Typography variant="body2" color="text.secondary">
                  الوقت
                </Typography>
                <Typography variant="body1">
                  {editData.startTime} - {editData.endTime}
                </Typography>
              </div>

              <div>
                <Typography variant="body2" color="text.secondary">
                  السعر
                </Typography>
                <Typography variant="body1">{editData.price} جنيه</Typography>
              </div>

              <div>
                <Typography variant="body2" color="text.secondary">
                  الحالة
                </Typography>
                <Typography variant="body1">{editData.status}</Typography>
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <Typography variant="body2" color="text.secondary">
                  السبب
                </Typography>
                <Typography variant="body1">{editData.reason}</Typography>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewDialog(false)}>إغلاق</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default BookedDoctors;
