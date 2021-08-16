import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getMarketSummary } from '../../api';

const useStyles = makeStyles({
  table: {
    width: '100%'
  },
  container: {
    maxHeight: 550
  }
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontSize: 22,
    fontWeight: 400,
    whiteSpace: 'nowrap'
  },
  body: {
    fontSize: 18,
    fontWeight: 400
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
      whiteSpace: 'nowrap'
    }
  }
}))(TableRow);

const MarketSummary = ({}) => {
  const classes = useStyles();
  const [market, setMarket] = useState(null);

  useEffect(() => {
    getMarketSummary().then((data) => setMarket(data));
  }, []);

  return (
    <div className="stock-table">
      {market && (
        <TableContainer component={Paper} className={classes.container}>
          <Table
            className={classes.table}
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Ticker Symbol</StyledTableCell>
                <StyledTableCell align="left">Company</StyledTableCell>
                <StyledTableCell align="left">Change</StyledTableCell>
                <StyledTableCell align="left">Open</StyledTableCell>
                <StyledTableCell align="left">High</StyledTableCell>
                <StyledTableCell align="left">Previous Close</StyledTableCell>
                <StyledTableCell align="left">Volume</StyledTableCell>
                <StyledTableCell align="left">Current Value</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {market.map((data) => (
                <StyledTableRow key={data.name}>
                  <StyledTableCell align="left">{data.symbol}</StyledTableCell>
                  <StyledTableCell align="left">
                    {data.companyName}
                  </StyledTableCell>
                  <StyledTableCell align="left">{data.change}</StyledTableCell>
                  <StyledTableCell align="left">{data.open}</StyledTableCell>
                  <StyledTableCell align="left">{data.high}</StyledTableCell>
                  <StyledTableCell align="left">
                    {data.previousClose}
                  </StyledTableCell>
                  <StyledTableCell align="left">{data.volume}</StyledTableCell>
                  <StyledTableCell align="left">
                    {data.week52High}
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

MarketSummary.propTypes = {
  stocks: PropTypes.any.isRequired
};

export default MarketSummary;
