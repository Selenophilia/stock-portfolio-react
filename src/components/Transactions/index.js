import React from 'react';
import { useQuery } from '@apollo/client';
import { BigNumber } from 'bignumber.js';
import { transactions } from '../../api/queries.js';
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
    color: theme.palette.common.white,
    fontSize: 24
  },
  body: {
    fontSize: 24
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const Transactions = ({}) => {
  const classes = useStyles();
  const { loading, error, data = {} } = useQuery(transactions);
  return (
    <div className="transactions">
      <div className="title">
        <h1>Transaction History</h1>
      </div>
      {loading && <p> loading... </p>}
      {error && <p> {`Error! ${error.message}`}</p>}
      {data.getTransactions !== undefined && (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">id</StyledTableCell>
                <StyledTableCell align="left">Quantity</StyledTableCell>
                <StyledTableCell align="left">username</StyledTableCell>
                <StyledTableCell align="left">CreatedAt</StyledTableCell>
                <StyledTableCell align="left">Purchase Price</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.getTransactions.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="left">{row.id}</StyledTableCell>
                  <StyledTableCell align="left">{row.quantity}</StyledTableCell>
                  <StyledTableCell align="left">{'user+1'}</StyledTableCell>
                  <StyledTableCell align="left">{'user+1'}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.purchasePrice}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

Transactions.propTypes = {};

export default Transactions;
