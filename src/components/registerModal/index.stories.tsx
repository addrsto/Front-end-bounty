import React from 'react';
import { storiesOf } from '@storybook/react';

import RegisterModal from '.';

storiesOf('RegisterModal', module)
  .add('Standard', () => (
    <RegisterModal
      handle="Jasper"
      onRegister={() => console.log('Register')}
      onGoogleSignIn={() => console.log('Register with Google')}
      onMetamaskLogIn={() => console.log('Register with Google')}
      toggle={() => console.log('Toggle')}
      error=""
      isOpen
    />
  ));
