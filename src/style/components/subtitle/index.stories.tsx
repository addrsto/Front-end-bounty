import React from 'react';
import { storiesOf } from '@storybook/react';

import Subtitle from '.';

storiesOf('Subtitle', module)
  .add('standard', () => <Subtitle>Hello</Subtitle>);
