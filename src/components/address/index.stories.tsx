import React from 'react';
import { storiesOf } from '@storybook/react';

import Address from '.';

storiesOf('Address', module)
  .add('Standard', () => (
    <Address
      logo="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1024px-Bitcoin.svg.png"
      name="Bitcoin"
      address="1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4Bn"
      onRemove={() => {}}
    />
  ));
