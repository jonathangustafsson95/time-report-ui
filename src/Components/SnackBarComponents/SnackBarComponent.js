import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackBar = ({ show, hide, error=false }) => {
  console.log(show);
  let severity = error ? "error" : "success";
  let message = error ? "Could not load data from server... Check your connection." : "Changes was succesfully stored.";

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    hide(false);
  };

  return (
    <Snackbar open={show} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
    </Snackbar>
  );
};

export default SnackBar;
