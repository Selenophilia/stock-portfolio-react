import React, { useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { Collapse, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Proptypes from 'prop-types';
const Alert = ({ message, clearMessage }) => {
  const [open, setOpen] = useState(true);
  return (
    <Collapse in={open}>
      <MuiAlert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
              clearMessage();
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        severity="error"
        elevation={6}
        variant="filled"
      >
        {message}
      </MuiAlert>
    </Collapse>
  );
};

Alert.propTypes = {
  clearMessage: Proptypes.func.isRequired,
  message: Proptypes.string.isRequired
};

export default Alert;
