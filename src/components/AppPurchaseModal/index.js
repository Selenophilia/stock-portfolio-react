import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Modal,
  Typography,
  TextField
} from '@material-ui/core';
import PaymentIcon from '@material-ui/icons/Payment';
import { useMutation } from '@apollo/client';
import { purchase } from '../../api/mutation';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 600,
    marginBottom: 20,
    color: '#6c6c6c'
  },
  avatar: {
    margin: 'auto',
    backgroundColor: theme.palette.primary.main,
    height: 64,
    width: 64
  },
  paper: {
    position: 'absolute',
    height: 550,
    width: 450,
    top: '10%',
    marginLeft: 500,
    backgroundColor: theme.palette.background.paper,
    border: 'none',
    borderRadius: 12,
    boxShadow: theme.shadows[5],
    padding: 40
  },
  buy: {
    color: '#fff',
    width: 100,
    height: 30,
    background: '#4ac733',
    '&:hover': {
      backgroundColor: '#42b42e'
    }
  },
  field: {
    width: '100%',
    marginTop: 30,
    marginBottom: 30
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  confirm: {
    color: '#fff',
    width: 100,
    height: 40,
    backgroundColor: theme.palette.primary.main,
    marginLeft: 20,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  },
  cancel: {
    color: '#fff',
    width: 100,
    height: 40,
    background: '#b54928',
    marginLeft: 20,
    '&:hover': {
      backgroundColor: '#ac4525'
    }
  },
  divider: {
    marginTop: 30,
    marginBottom: 30
  }
}));

export const AppPurchaseModal = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const symbolRef = useRef();
  const quantiyRef = useRef();

  const [purchaseFunc] = useMutation(purchase, {
    onCompleted: (data) => {
      console.log('data', data);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    purchaseFunc({
      variables: {
        symbol: symbolRef.current.value,
        price: 150.23,
        openPrice: 50.12,
        purchasePrice: 142.2,
        purchaseQuantity: Number(quantiyRef.current.value)
      }
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <Typography variant="h5" component="h2" className={classes.title}>
        Buy a stock
      </Typography>
      <Avatar className={classes.avatar}>
        <PaymentIcon fontSize="large" />
      </Avatar>
      <Divider variant="middle" className={classes.divider} />
      <form className="purchase-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <TextField
            id="outlined-basic"
            label="Ticker Symbol"
            className={classes.field}
            variant="outlined"
            inputRef={symbolRef}
          />
          <TextField
            id="outlined-basic"
            label="Quantity"
            className={classes.field}
            variant="outlined"
            inputRef={quantiyRef}
          />
        </div>
        <Box component="div" className={classes.buttons}>
          <Button className={classes.cancel} onClick={handleClose}>
            Cancel
          </Button>
          <Button className={classes.confirm}> Confirm </Button>
        </Box>
      </form>
    </div>
  );

  return (
    <>
      <Button
        variant="contained"
        className={classes.buy}
        onClick={handleOpen}
        disableElevation
      >
        Buy
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
};

export default AppPurchaseModal;
