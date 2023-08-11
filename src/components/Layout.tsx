import React from "react";
import Loader from "./Loader";
import Toaster from "./Toaster";

interface layoutProps {
  loader: boolean;
  open: boolean;
  message: string;
  handleClose: () => void;
  children: any;
  severity?: "success" | "error" | "warning" | "info";
  autoHideDuration?: number;
  vertical?: "top" | "bottom";
  horizontal?: "left" | "center" | "right";
}

const Layout: React.FC<layoutProps> = ({
  loader,
  message,
  severity,
  open,
  autoHideDuration,
  vertical,
  horizontal,
  handleClose,
  children,
}) => {
  return (
    <div>
      <Loader loader={loader} />
      <Toaster
        message={message}
        severity={severity}
        open={open}
        autoHideDuration={autoHideDuration}
        vertical={vertical}
        horizontal={horizontal}
        handleClose={handleClose}
      />
      <div>{children}</div>
    </div>
  );
};

export default React.memo(Layout);
