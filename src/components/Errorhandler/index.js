import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import MuiAlert from '@material-ui/lab/Alert';
import { Collapse, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Proptypes from 'prop-types';

const Alert = ({ message, clearMessage, username, ...props }) => {
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
        elevation={6}
        variant="filled"
        {...props}
      >
        {console.log(username)}
        {message.includes('Welcome') || username ? (
          <FormattedMessage
            id="app.welcome"
            defaultMessage="Hello, {name}"
            values={{
              name: `${username}`
            }}
          />
        ) : (
          message
        )}
      </MuiAlert>
    </Collapse>
  );
};

Alert.propTypes = {
  clearMessage: Proptypes.func.isRequired,
  message: Proptypes.string.isRequired,
  username: Proptypes.string.isRequired
};

export default Alert;
