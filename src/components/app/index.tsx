import React, { useState } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import {
  ThemeProvider,
} from 'styled-components';

import { Web3ReactProvider } from '@web3-react/core';
import getLibrary from '../lib/getLibrary';
import lightTheme from '../../style/lightTheme';

import GlobalStyle from '../../style/globalStyle';

import Footer from '../footer';
import Auth from '../auth';
import Send from '../../routes/send';
import About from '../../routes/about';
import Profile from '../../routes/profile';

import DuplicateContext from '../context/DuplicateContext';

function App() {
  const [isduplicate, toggleisduplicate] = useState(false);
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <DuplicateContext.Provider value={[isduplicate, toggleisduplicate]}>
        <BrowserRouter>
          <>
            <ThemeProvider theme={lightTheme}>
              <>
                <GlobalStyle />
                <Switch>
                  <Route path="/" exact component={Auth} />
                  <Route path="/about" exact component={About} />
                  <Route path="/:handle/:coin" exact component={Send} />
                  <Route path="/:handle" exact component={Profile} />
                  <Route path="/" component={Auth} />
                </Switch>
                <Footer />
              </>
            </ThemeProvider>
          </>
        </BrowserRouter>
      </DuplicateContext.Provider>
    </Web3ReactProvider>
  );
}

export default App;
