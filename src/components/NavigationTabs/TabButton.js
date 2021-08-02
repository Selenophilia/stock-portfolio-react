import React from 'react';
import { PropTypes } from 'prop-types';

const TabButtons = ({ labels, changeTab, activeTab }) => {
  return (
    <div className="btn-container">
      {labels.map((label, idx) => {
        return (
          <button
            key={idx}
            className={['tab-btns', label === activeTab ? 'active' : ''].join(
              ' '
            )}
            onClick={() => changeTab(label)}
          >
            {label}
            {label === activeTab ? <hr /> : ''}
          </button>
        );
      })}
    </div>
  );
};

TabButtons.propTypes = {
  labels: PropTypes.array.isRequired,
  changeTab: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired
};

export default TabButtons;
