// components/ConfirmButton.tsx
import { Button, CircularProgress } from "@mui/material";

type ConfirmButtonProps = {
  isLoading: boolean;
  onClick: () => void;
  disabled?: boolean;
};

const ConfirmButton = ({
  isLoading,
  onClick,
  disabled = false,
}: ConfirmButtonProps) => (
  <Button
    onClick={onClick}
    disabled={disabled || isLoading}
    variant="contained"
    color="primary"
    startIcon={isLoading ? <CircularProgress size={20} /> : null}
  >
    {isLoading ? "جاري التحميل..." : "تأكيد الموقع"}
  </Button>
);

export default ConfirmButton;
