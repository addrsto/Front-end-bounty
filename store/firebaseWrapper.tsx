import React, {
  useReducer,
} from 'react';

import FirebaseContext from './firebaseContext';
import FirebaseLoader from './firebaseLoader';

function updateState(state: StateInterface, action: ActionInterface) {
  switch (action.type) {
    case 'set':
      return {
        ...state,
        [action.target]: action.value,
      };
    default:
      throw new Error('Unexpected action...');
  }
}

const initialState = {
  username: '',
};

function FirebaseWrapper() {
  const [state, dispatch] = useReducer(updateState, initialState);

  return (
    <FirebaseContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      <FirebaseLoader />
    </FirebaseContext.Provider>
  );
}

export default FirebaseWrapper;
