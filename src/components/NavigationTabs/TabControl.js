import React, { useState } from 'react';
import Proptypes from 'prop-types';
import TabButtons from './TabButton';
import MarketSummary from '../MarketSummary';
import Portfolio from '../Portfolio';
import Transactions from '../Transactions';
import './tabs.scss';
const TabControl = ({ rows, children }) => {
  const labels = [];
  const [activeTab, setActivetab] = useState(children[0].props.label);

  const changeTab = (tab) => {
    setActivetab(tab);
  };

  const handleContent = (label) => {
    if (label === 'Portfolio') {
      return <Portfolio rows={rows} />;
    } else if (label === 'Transactions') {
      return <Transactions />;
    } else if (label === 'Market Summary') {
      return <MarketSummary />;
    }
  };
  return (
    <>
      {React.Children.map(children, (child) => {
        labels.push(child.props.label);
      })}
      <TabButtons labels={labels} activeTab={activeTab} changeTab={changeTab} />
      <div className="content">{handleContent(activeTab)}</div>
    </>
  );
};

TabControl.propTypes = {
  rows: Proptypes.array.isRequired,
  children: Proptypes.array.isRequired
};

export default TabControl;
