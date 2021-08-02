import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Tab = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

Tab.propTypes = {
  children: PropTypes.node.isRequired
};

export default Tab;
