import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import './index.scss';
import { getMarketSummary } from '../../api';

const MarketSummary = ({}) => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: 'Ticker Symbol',
      field: 'symbol'
    },
    {
      title: 'Company',
      field: 'companyName'
    },
    {
      title: 'Change',
      field: 'change'
    },
    {
      title: 'Open',
      field: 'openTime'
    },
    {
      title: 'High',
      field: 'highTime'
    },
    {
      title: 'Low',
      field: 'low'
    },
    {
      title: 'Previous Close',
      field: 'previousClose'
    },
    {
      title: 'Volume',
      field: 'previousVolume'
    },
    {
      title: 'Current Value',
      field: 'latestPrice'
    }
  ];

  const stocks = [
    {
      symbol: 'msft',
      company: 'Microsoft',
      change: 12,
      open: '50.12',
      previousclose: '150',
      high: ' 100.2',
      low: '150.2',
      volume: '50.2',
      current: '200'
    },
    {
      symbol: 'aapl',
      company: 'Apple Inc',
      change: 24,
      open: '100.23',
      previousclose: '150',
      high: '100.2',
      low: '150.2',
      volume: '50.2',
      current: '200'
    },
    {
      symbol: 'goog',
      company: 'Google',
      change: 18,
      open: '200.21',
      previousclose: '150',
      high: '100.2',
      low: '150.2',
      volume: '50.2',
      current: '200'
    },
    {
      symbol: 'tsla',
      company: 'Tesla',
      change: 25,
      open: '150.23',
      previousclose: '150',
      high: '100.2',
      low: '150.2',
      volume: '50.2',
      current: '200'
    }
  ];

  useEffect(() => {
    //const results = await getMarketSummary();
    setData(stocks);
  }, []);

  return (
    <div className="stock-table">
      <MaterialTable
        data={data}
        columns={columns}
        options={{
          search: false,
          paging: true,
          filtering: false,
          exportButton: false,
          showTitle: false,
          toolbar: false,
          tableLayout: 'fixed',
          headerStyle: {
            whiteSpace: 'nowrap'
          }
        }}
      />
    </div>
  );
};

MarketSummary.propTypes = {
  stocks: PropTypes.any.isRequired
};

export default MarketSummary;
