import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Button,
  ListItemIcon,
  ListItemText,
  Box
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import AppPurchaseModal from '../AppPurchaseModal';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles(() => ({
  container: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  user: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    marginRight: 5,
    fontSize: 24
  },
  signout: {
    marginLeft: 10,
    color: '#fff'
  },
  buy: {
    color: '#fff',
    width: 100,
    height: 30
  }
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  }
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(() => ({
  root: {
    color: 'black'
  }
}))(MenuItem);

const AppHeader = () => {
  const classes = useStyles();
  const user = localStorage.getItem('user');
  const [menu, setMenu] = useState(null);

  const handleClick = (event) => {
    setMenu(event.currentTarget);
  };

  const handleClose = () => {
    setMenu(null);
  };
  const { username } = JSON.parse(user);
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push('/login');
  };

  return (
    <div className={classes.container}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            <Box component="div" className={classes.user}>
              <BeachAccessIcon className={classes.icon} />
              <FormattedMessage
                id="app.title"
                defaultMessage="IEX Stock Portfolio"
              />
            </Box>
          </Typography>
          <AppPurchaseModal />
          <Button
            color="inherit"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <Box component="div" className={classes.user}>
              <AccountCircleIcon className={classes.icon} />
              {username}
            </Box>
          </Button>
          <StyledMenu
            id="customized-menu"
            anchorEl={menu}
            keepMounted
            open={Boolean(menu)}
            onClose={handleClose}
          >
            <StyledMenuItem onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary=" Sign out" />
            </StyledMenuItem>
          </StyledMenu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppHeader;
