import React from 'react';
import { storiesOf } from '@storybook/react';

import Input from '.';

storiesOf('SearchBar', module)
  .add('Standard', () => (
    <Input placeholder="Placeholder" />
  ))
  .add('Standard & Block', () => (
    <div>
      <Input placeholder="Placeholder" block />
    </div>
  ));
