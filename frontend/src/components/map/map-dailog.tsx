// components/MapDialog.tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type MapDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions: React.ReactNode;
  coordinates: string;
};

const MapDialog = ({
  open,
  onClose,
  title,
  children,
  actions,
  coordinates,
}: MapDialogProps) => (
  <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    maxWidth="md"
    PaperProps={{
      sx: {
        height: "80vh",
        maxHeight: 700,
      },
    }}
  >
    <DialogTitle sx={{ m: 0, p: 2 }}>
      <Typography variant="h6">{title}</Typography>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>

    <DialogContent dividers sx={{ p: 0, position: "relative" }}>
      {children}
    </DialogContent>

    <DialogActions sx={{ justifyContent: "space-between", p: 2 }}>
      <Typography variant="body2" color="text.secondary">
        {coordinates}
      </Typography>
      {actions}
    </DialogActions>
  </Dialog>
);

export default MapDialog;
