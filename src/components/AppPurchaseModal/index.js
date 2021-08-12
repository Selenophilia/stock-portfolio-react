import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal } from '@material-ui/core';

import { useMutation } from '@apollo/client';
import { purchase } from '../../api/mutation';
import PropTypes from 'prop-types';
import './index.scss';
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    height: 500,
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: 'none',
    borderRadius: 12,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  buy: {
    color: '#fff',
    width: 100,
    height: 30,
    background: '#4ac733'
  }
}));

export const AppPurchaseModal = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const symbolRef = useRef();
  const quantiyRef = useRef();

  //get transactionid
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
    <div style={modalStyle} className={classes.paper}>
      <h4 id="simple-modal-title">Buy a stock</h4>
      <form className="purchase-form" onSubmit={handleSubmit}>
        <label className="form-label">Ticker Symbol:</label>
        <input className="ticker" type="text" ref={symbolRef} />
        <label className="form-label">Quantity:</label>
        <input className="quantiy" type="number" ref={quantiyRef} />
        <button className="buy-btn">Buy</button>
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
