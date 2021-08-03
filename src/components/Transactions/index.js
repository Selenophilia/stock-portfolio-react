import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './index.scss';

const useStyles = makeStyles({
  table: {
    minWidth: 900
  }
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

function createData(symbol, change, quantity, price, cost) {
  return { symbol, change, quantity, price, cost };
}

const rows = [
  createData('AAPL', '-0.24%', '1 share', '150.99', '25.00'),
  createData('MSFT', '-0.24%', '1 share', '150.99', '25.00'),
  createData('GOOG', '-0.24%', '1 share', '150.99', '25.00'),
  createData('AAPL', '-0.24%', '1 share', '150.99', '25.00'),
  createData('AAPL', '-0.24%', '1 share', '150.99', '25.00')
];

const Transactions = ({ ...props }) => {
  const classes = useStyles();

  return (
    <div className="transactions">
      <div className="title">
        <h1>Transaction History</h1>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Ticker Symbol</StyledTableCell>
              <StyledTableCell align="left">Change</StyledTableCell>
              <StyledTableCell align="left">Quantity</StyledTableCell>
              <StyledTableCell align="left">Price</StyledTableCell>
              <StyledTableCell align="left">Total Cost</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="left">{row.symbol}</StyledTableCell>
                <StyledTableCell align="left">{row.change}</StyledTableCell>
                <StyledTableCell align="left">{row.quantity}</StyledTableCell>
                <StyledTableCell align="left">{row.price}</StyledTableCell>
                <StyledTableCell align="left">{row.cost}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

Transactions.propTypes = {};

export default Transactions;
