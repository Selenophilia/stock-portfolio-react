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
import { getMarketSummary } from '../../api';

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

function createData(
  symbol,
  company,
  change,
  previousclose,
  high,
  low,
  volume,
  current
) {
  return { symbol, company, change, previousclose, high, low, volume, current };
}

const rows = [
  createData('msft', 'Microsoft', 12, '50.12', '150', ' 100.2', '50.2', '200'),
  createData('aapl', 'Apple Inc', 12, '50.12', '150', ' 100.2', '50.2', '200'),
  createData('goog', 'Google', 12, '50.12', '150', ' 100.2', '50.2', '200'),
  createData('msft', 'Microsoft', 12, '50.12', '150', ' 100.2', '50.2', '200'),
  createData('tsla', 'Tesla', 12, '50.12', '150', ' 100.2', '50.2', '200'),
  createData('msft', 'Microsoft', 12, '50.12', '150', ' 100.2', '50.2', '200'),
  createData('msft', 'Microsoft', 12, '50.12', '150', ' 100.2', '50.2', '200'),
  createData('msft', 'Microsoft', 12, '50.12', '150', ' 100.2', '50.2', '200')
];
const MarketSummary = ({}) => {
  const classes = useStyles();
  return (
    <div className="stock-table">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
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
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="left">{row.symbol}</StyledTableCell>
                <StyledTableCell align="left">{row.company}</StyledTableCell>
                <StyledTableCell align="left">{row.change}</StyledTableCell>
                <StyledTableCell align="left">{row.open}</StyledTableCell>
                <StyledTableCell align="left">{row.high}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.previousclose}
                </StyledTableCell>
                <StyledTableCell align="left">{row.volume}</StyledTableCell>
                <StyledTableCell align="left">{row.current}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

MarketSummary.propTypes = {
  stocks: PropTypes.any.isRequired
};

export default MarketSummary;
