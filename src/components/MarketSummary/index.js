import React from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import './index.scss';

const MarketSummary = ({ stocks }) => {
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

  return (
    <div className="stock-table">
      <MaterialTable
        title="Market Summary"
        data={stocks}
        columns={columns}
        options={{
          search: false,
          paging: true,
          filtering: false,
          exportButton: false
        }}
      />
    </div>
  );
};

MarketSummary.propTypes = {
  stocks: PropTypes.any.isRequired
};

export default MarketSummary;
