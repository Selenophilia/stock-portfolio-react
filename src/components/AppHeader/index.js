import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './index.scss';

const AppHeader = () => {
  return (
    <header className="page-header">
      <nav className="nav-bar">
        <div className="logo">
          <FontAwesomeIcon
            className="icon"
            icon={faRocket}
            size="2x"
            color="white"
          />
          <span className="title">MetaStock</span>
        </div>
        <div className="nav-link">
          <div className="user">
            <FontAwesomeIcon
              className="icon"
              icon={faUserCircle}
              size="2x"
              color="white"
            />
            <a href="/">John Doe </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
