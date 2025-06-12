import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Iconify } from "./iconify";

type DialogStatus = "success" | "warning" | "error" | "info";

interface ConfirmationDialogProps {
  title: string;
  content: React.ReactNode;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  status?: DialogStatus;
  icon?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
  clickAction: (props: { openDialog: () => void }) => React.ReactNode;
}

export interface ConfirmationDialogRef {
  openDialog: () => void;
  closeDialog: () => void;
}

const STATUS_ICONS = {
  success: (
    <Iconify
      icon="icon-park-outline:success"
      sx={{ color: "success.dark" }}
      width={150}
    />
  ),
  warning: (
    <Iconify
      icon="emojione-monotone:warning"
      sx={{ color: "warning.dark" }}
      width={150}
    />
  ),
  error: (
    <Iconify
      icon="uiw:circle-close-o"
      sx={{ color: "error.dark" }}
      width={150}
    />
  ),
  info: (
    <Iconify
      icon="fluent:info-32-regular"
      sx={{ color: "info.dark" }}
      width={150}
    />
  ),
} as const;

const getStatusColor = (status: DialogStatus, isSubtitle: boolean = false) => {
  const colorMap = {
    success: isSubtitle ? "success.darker" : "success.dark",
    warning: isSubtitle ? "warning.darker" : "warning.dark",
    error: isSubtitle ? "error.darker" : "error.dark",
    info: isSubtitle ? "info.darker" : "info.dark",
  };

  return colorMap[status] || colorMap.info;
};

const ConfirmationDialog = forwardRef<
  ConfirmationDialogRef,
  ConfirmationDialogProps
>(
  (
    {
      title,
      content,
      confirmButtonLabel = "Confirm",
      cancelButtonLabel = "Cancel",
      status = "info",
      icon,
      onConfirm,
      onCancel,
      isLoading = false,
      clickAction,
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const prevIsLoadingRef = useRef(isLoading);

    const dialogIcon = useMemo(
      () => icon || STATUS_ICONS[status],
      [icon, status]
    );
    const statusColor = useMemo(() => getStatusColor(status), [status]);
    const statusSubtitleColor = useMemo(
      () => getStatusColor(status, true),
      [status]
    );

    const openDialog = useCallback(() => setOpen(true), []);
    const closeDialog = useCallback(() => {
      setOpen(false);
      onCancel?.();
    }, [onCancel]);

    const handleConfirm = useCallback(() => {
      onConfirm?.();
    }, [onConfirm]);

    useImperativeHandle(ref, () => ({
      openDialog,
      closeDialog,
    }));

    useEffect(() => {
      if (prevIsLoadingRef.current && !isLoading && open) {
        closeDialog();
      }
      prevIsLoadingRef.current = isLoading;
    }, [isLoading, open, closeDialog]);

    const handleDialogClose = useCallback(
      (_: unknown, reason: string) => {
        if (!isLoading && reason !== "backdropClick") {
          closeDialog();
        }
      },
      [isLoading, closeDialog]
    );

    return (
      <>
        {clickAction({ openDialog })}

        <Dialog open={open} onClose={handleDialogClose} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Box display="flex" alignItems="center">
              <Typography
                variant="h6"
                sx={{
                  flexGrow: 1,
                  color: statusColor,
                  fontWeight: (theme) => theme.typography.fontWeightBold,
                  textAlign: "center",
                }}
              >
                {title}
              </Typography>
              <IconButton
                aria-label="close"
                onClick={closeDialog}
                disabled={isLoading}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>

          <DialogContent
            dividers
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {dialogIcon}
            <Box
              py={2}
              sx={{
                width: "100%",
                color: statusSubtitleColor,
                textAlign: "center",
                fontWeight: (theme) => theme.typography.fontWeightBold,
              }}
            >
              {content}
            </Box>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={closeDialog}
              fullWidth
              variant="outlined"
              sx={{ color: "text.secondary", borderRadius: 0.5 }}
              disabled={isLoading}
            >
              {cancelButtonLabel}
            </Button>

            <Button
              onClick={handleConfirm}
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                borderRadius: 0.5,
                color: "white",
                backgroundColor: statusColor,
                "&:hover": { backgroundColor: statusSubtitleColor },
              }}
              autoFocus
            >
              {isLoading ? (
                <CircularProgress size={20} color="inherit" thickness={2} />
              ) : (
                confirmButtonLabel
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
);

ConfirmationDialog.displayName = "ConfirmationDialog";

export default ConfirmationDialog;
