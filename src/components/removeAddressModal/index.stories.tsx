import React from 'react';
import { storiesOf } from '@storybook/react';

import AddAddressModal from '.';

storiesOf('RemoveAddressModal', module)
  .add('Standard', () => (
    <AddAddressModal
      onRemoveAddress={() => console.log('Remove address')}
      toggle={() => console.log('Toggle')}
      isLoading={false}
      isOpen
    />
  ));
