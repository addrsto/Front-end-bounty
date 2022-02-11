import React from 'react';
import { storiesOf } from '@storybook/react';

import Text from '.';

storiesOf('Text', module)
  .add('standard', () => (
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </Text>
  ));
