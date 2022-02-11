import React from 'react';
import { storiesOf } from '@storybook/react';

import AddAddressModal from '.';

storiesOf('AddAddressModal', module)
  .add('Standard', () => (
    <AddAddressModal
      onAddAddress={() => console.log('Add address')}
      toggle={() => console.log('Toggle')}
      isLoading={false}
      isOpen
    />
  ));
