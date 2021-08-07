import React from 'react';
import PropTypes from 'prop-types';

const Custom = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

Custom.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired
};

export default Custom;
