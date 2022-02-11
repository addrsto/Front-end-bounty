import React, {
  useEffect,
  useState,
} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import Home from '../home';
import Dashboard from '../dashboard';

function Auth() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  if (isLoggedIn) {
    return <Dashboard />;
  }


  return <Home />;
}

export default Auth;
