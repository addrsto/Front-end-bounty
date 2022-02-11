import React from 'react';
import ReactDOM from 'react-dom';

import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

import firebaseConfig from './config/firebaseConfig';

import App from './components/app';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
