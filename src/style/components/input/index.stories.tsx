import React from 'react';
import { storiesOf } from '@storybook/react';

import Input from '.';

storiesOf('Input', module)
  .add('Standard', () => (
    <Input placeholder="Placeholder" />
  ))
  .add('Standard & Block', () => (
    <div>
      <Input placeholder="Placeholder" block />
    </div>
  ))
  .add('Disabled', () => (
    <div>
      <Input
        value="I am disabled"
        disabled
      />
    </div>
  ));
