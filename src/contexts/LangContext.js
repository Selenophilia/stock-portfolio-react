import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import Filipino from '../locales/ph.json';
import Japan from '../locales/ja.json';
import English from '../locales/en_US.json';

export const LanguageContext = createContext();

const local = navigator.language;

let lang;
switch (local) {
  case 'ph':
    lang = Filipino;
    break;
  case 'ja':
    lang = Japan;
    break;
  default:
    lang = English;
}

const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState(local);

  const [messages, setMessages] = useState(lang);

  const selectLanguage = (language) => {
    const newLocale = language;
    setLocale(newLocale);
    switch (newLocale) {
      case 'ph':
        setMessages(Filipino);
        break;
      case 'ja':
        setMessages(Japan);
        break;
      default:
        setMessages(English);
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, selectLanguage }}>
      <IntlProvider messages={messages} locale={locale}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default LanguageProvider;
