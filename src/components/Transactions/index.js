import React from 'react';
import { useQuery } from '@apollo/client';
import { transactions } from '../../api/queries.js';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import BigNumber from 'bignumber.js';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles({
  headings: {
    marginBottom: 20
  },
  text: {
    fontSize: 22,
    fontWeight: 500
  },
  table: {
    minWidth: 1024
  },
  container: {
    maxHeight: 500
  }
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontSize: 22,
    fontWeight: 400
  },
  body: {
    fontSize: 18,
    fontWeight: 400
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
  const {
    loading,
    error,
    data = {}
  } = useQuery(transactions, { fetchPolicy: 'cache-and-network' });
  return (
    <div className="transactions">
      {loading && <p> loading... </p>}
      {error && <p> {`Error! ${error.message}`}</p>}
      {data.getTransactions ? (
        <TableContainer component={Paper} className={classes.container}>
          <Table
            className={classes.table}
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">id</StyledTableCell>
                <StyledTableCell align="left">
                  <FormattedMessage
                    id="app.quantity"
                    defaultMessage="Quantity"
                  />
                </StyledTableCell>
                <StyledTableCell align="left">
                  <FormattedMessage
                    id="app.username"
                    defaultMessage="Username"
                  />
                </StyledTableCell>
                <StyledTableCell align="left">
                  <FormattedMessage
                    id="app.createdAt"
                    defaultMessage="CreatedAt"
                  />
                </StyledTableCell>
                <StyledTableCell align="left">
                  <FormattedMessage
                    id="app.purchasePrice"
                    defaultMessage="Purchase Price"
                  />
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.getTransactions.map((transaction) => {
                const str = transaction.createdAt.split('T');
                return (
                  <StyledTableRow key={transaction.id}>
                    <StyledTableCell align="left">
                      {transaction.id}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {transaction.quantity}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {transaction.purchaseBy.username}
                    </StyledTableCell>
                    <StyledTableCell align="left">{str[0]}</StyledTableCell>
                    <StyledTableCell align="left">
                      {`$${BigNumber(transaction.purchasePrice).c}`}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h1">No Transactions yet</Typography>
      )}
    </div>
  );
};

Transactions.propTypes = {};

export default Transactions;
