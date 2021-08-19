import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import BigNumber from 'bignumber.js';
import { useQuery } from '@apollo/client';
import { stocks, getUser } from '../../api/queries';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';

const useStyles = makeStyles({
  headings: {
    display: 'flex',
    justifyContent: 'space-between',
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
  },
  change: {
    color: '#4ac733'
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const Portfolio = ({}) => {
  const { data = {} } = useQuery(stocks, { fetchPolicy: 'cache-and-network' });
  const user = useQuery(getUser, { fetchPolicy: 'cache-and-network' });

  const classes = useStyles();
  return (
    <div className="portfolio">
      <Box component="div" className={classes.headings}>
        <Typography variant="h5" className={classes.text}>
          Your Portfolio
        </Typography>
        {user.data && (
          <Typography variant="h5" className={classes.text}>
            {`Balance: $${BigNumber(user.data.getUser.balance).toFormat(2)}`}
          </Typography>
        )}
      </Box>

      {data.getStocks ? (
        <TableContainer component={Paper} className={classes.container}>
          <Table
            className={classes.table}
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Ticker Symbol</StyledTableCell>
                <StyledTableCell align="center">Change</StyledTableCell>
                <StyledTableCell align="center">Quantity</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">Total Cost</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.getStocks.map((stocks) => {
                const price = BigNumber(stocks.price);
                const openPrice = BigNumber(stocks.openPrice);
                return (
                  <StyledTableRow key={stocks.id}>
                    <StyledTableCell align="center">
                      {stocks.symbol}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      style={{ color: '#4ac733' }}
                    >
                      {`${stocks.change}%`}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {stocks.quantity}
                    </StyledTableCell>
                    <StyledTableCell align="center">{price.c}</StyledTableCell>
                    <StyledTableCell
                      align="center"
                      style={{ color: '#b54928' }}
                    >
                      {`$${openPrice}`}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No stocks yet!</Typography>
      )}
    </div>
  );
};

Portfolio.propTypes = {
  rows: PropTypes.array.isRequired
};

export default Portfolio;
