import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import './index.scss';
import { Box } from '@material-ui/core';

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

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

const AppHeader = () => {
  const classes = useStyles();
  const user = localStorage.getItem('user');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
              IEX Stock Application
            </Box>
          </Typography>
          <Button
            variant="h6"
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
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
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
