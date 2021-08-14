import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
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
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const Portfolio = ({ rows }) => {
  const classes = useStyles();
  return (
    <div className="portfolio">
      <Box component="div" className={classes.headings}>
        <Typography variant="h5" className={classes.text}>
          Your Portfolio
        </Typography>
        <Typography variant="h5" className={classes.text}>
          Balance: $ 50,000.00
        </Typography>
      </Box>
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} stickyHeader aria-label="sticky table">
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
            {rows.map((row, idx) => (
              <StyledTableRow key={idx}>
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

Portfolio.propTypes = {
  rows: PropTypes.array.isRequired
};

export default Portfolio;
