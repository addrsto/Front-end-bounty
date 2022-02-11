import React, {
  useEffect,
  useContext,
} from 'react';
import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

import firebaseConfig from '../config/firebaseConfig';

import FirebaseContext from './firebaseContext';

import App from '../components/app';

function FirebaseLoader() {
  const state = useContext(FirebaseContext);

  const {
    dispatch,
    username,
  } = state;

  useEffect(() => {

  }, []);

  useEffect(() => {
    dispatch({
      target: 'username',
      value: 'Jasper',
      type: 'set',
    });
  }, [dispatch]);

  return <App />;
}

export default FirebaseLoader;
