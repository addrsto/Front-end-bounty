import React from 'react';
import { storiesOf } from '@storybook/react';

import Dropdown from '.';

import Coins from '../../../assets/coins/coins.json';

storiesOf('Dropdown', module)
  .add('standard', () => (
    <>
      <Dropdown
        initialLabel="Select a token"
        coins={Coins}
        onSelect={(e: string) => console.log(e)}
      />
    </>
  ));
