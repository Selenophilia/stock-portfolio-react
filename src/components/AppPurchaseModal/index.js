import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
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
import { fetchQuote } from '../../api';
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
    marginLeft: 650,
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
  const [errMsg, setErrMsg] = useState(null);
  const symbolRef = useRef();
  const quantiyRef = useRef();

  const [purchaseFunc] = useMutation(purchase, {
    onError: (error) => {
      console.log(error);
    },
    onCompleted: () => {
      console.log('purchase completed');
    }
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrMsg(null);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (symbolRef.current.value && quantiyRef.current.value) {
        const { latestPrice, iexOpen, change } = await fetchQuote(
          symbolRef.current.value
        );
        const total = parseFloat(quantiyRef.current.value) * latestPrice;

        purchaseFunc({
          variables: {
            symbol: symbolRef.current.value,
            price: latestPrice,
            change: change,
            openPrice: iexOpen,
            purchasePrice: parseFloat(total),
            purchaseQuantity: Number(quantiyRef.current.value)
          }
        });
        handleClose();
      } else {
        setErrMsg('Please include a valid quantity symbol');
      }
    } catch (err) {
      console.log('err', err);
    }
  };

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
        <div className={classes.paper}>
          <Typography variant="h5" component="h2" className={classes.title}>
            Buy a stock
          </Typography>
          <Avatar className={classes.avatar}>
            <PaymentIcon fontSize="large" />
          </Avatar>
          <Divider variant="middle" className={classes.divider} />
          {errMsg ? (
            <Typography variant="h6" component="h6">
              {errMsg}
            </Typography>
          ) : (
            ''
          )}
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
                type="number"
              />
            </div>
            <Box component="div" className={classes.buttons}>
              <Button className={classes.cancel} onClick={handleClose}>
                Cancel
              </Button>
              <Button className={classes.confirm} type="submit">
                Confirm
              </Button>
            </Box>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AppPurchaseModal;
