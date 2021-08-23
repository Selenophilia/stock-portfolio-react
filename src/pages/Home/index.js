import React, { useEffect, useState, useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { LanguageContext } from '../../contexts/LangContext';
import AppHeader from '../../components/AppHeader';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../../components/TabPanel';
import Portfolio from '../../components/Portfolio';
import Transactions from '../../components/Transactions';
import MarketSummary from '../../components/MarketSummary';
import './index.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100vh',
    '& div.MuiTabs-scroller': {
      '& .MuiTabs-flexContainer': {
        width: 200,
        '& .MuiTab-root': {
          '& .MuiTab-wrapper': {
            alignItems: 'flex-start',
            fontSize: 18,
            textTransform: 'capitalize'
          }
        }
      }
    }
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  tabpanels: {
    width: '100%',
    background: theme.palette.action.hover
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.7em',
      borderRadius: '50%'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: 'none',
      borderRadius: '20px '
    }
  }
}));

const Home = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const user = localStorage.getItem('user');
  const context = useContext(LanguageContext);
  const [language, setLanguage] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLanguage = (e) => {
    context.selectLanguage(e.target.value);
    setLanguage(e.target.value);
  };

  useEffect(() => {
    const { username } = JSON.parse(user);
    console.log(username);
  }, []);

  return (
    <div className="stock-container">
      <AppHeader />
      <div className="stock-content">
        <div className={classes.root}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            className={classes.tabs}
          >
            <Tab
              className={classes.tabs}
              label={
                <FormattedMessage
                  id="app.portfolio"
                  defaultMessage="Portfolio"
                />
              }
              id="vertical-tab-0"
              aria-label="vertical-tabpanel-0"
            />
            <Tab
              className={classes.tabs}
              label={
                <FormattedMessage
                  id="app.transaction"
                  defaultMessage="Transaction"
                />
              }
              id="vertical-tab-1"
              aria-label="vertical-tabpanel-1"
            />
            <Tab
              className={classes.tabs}
              label={
                <FormattedMessage
                  id="app.marketsummary"
                  defaultMessage="Market Summary"
                />
              }
              id="vertical-tab-2"
              aria-label="vertical-tabpanel-2"
            />
          </Tabs>
          <TabPanel value={value} index={0} className={classes.tabpanels}>
            <Portfolio />
          </TabPanel>
          <TabPanel value={value} index={1} className={classes.tabpanels}>
            <Transactions />
          </TabPanel>
          <TabPanel value={value} index={2} className={classes.tabpanels}>
            <MarketSummary />
          </TabPanel>
        </div>
      </div>
      <div className="language">
        <select value={context.locale} onChange={handleLanguage}>
          <option value="en">English</option>
          <option value="ja">Japanese</option>
          <option value="ph">Filipino</option>
        </select>
      </div>
    </div>
  );
};

export default Home;
