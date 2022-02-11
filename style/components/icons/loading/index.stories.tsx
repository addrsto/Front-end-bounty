import React from 'react';
import { storiesOf } from '@storybook/react';

import LoadingIcon from '.';

storiesOf('Icons/Loading', module)
  .add('White', () => <LoadingIcon white />)
  .add('Standard', () => <LoadingIcon />);
