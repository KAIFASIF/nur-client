import React from "react";
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { SlClose } from "react-icons/Sl";

interface toastProps {
  message: string;
  severity?: "success" | "error" | "warning" | "info";
  open: boolean;
  handleClose: () => void;
  autoHideDuration?: number;
  vertical?: "top" | "bottom";
  horizontal?: "left" | "center" | "right";
}

const Toaster: React.FC<toastProps> = ({
  message,
  severity,
  open,
  handleClose,
  autoHideDuration,
  vertical,
  horizontal,
}) => {
  return (
    <Snackbar
      autoHideDuration={autoHideDuration ? autoHideDuration : 2000}
      anchorOrigin={{
        vertical: vertical ? vertical : "top",
        horizontal: horizontal ? horizontal : "center",
      }}
      open={open}
      onClose={handleClose}
      key={vertical ? vertical : "top" + horizontal ? horizontal : "center"}
    >
      <Alert severity={severity ? severity : "success"}>
        <div className="flex ">
          {message}
          <span className="cursor-pointer" onClick={handleClose}>
            <SlClose className=" ml-2 text-lg" />
          </span>
        </div>
      </Alert>
    </Snackbar>
  );
};

export default React.memo(Toaster);

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
