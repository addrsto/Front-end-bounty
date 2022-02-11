import React from 'react';
import { storiesOf } from '@storybook/react';

import ChevronDownIcon from '.';

storiesOf('Icons/ChevronDown', module)
  .add('White', () => <ChevronDownIcon white />)
  .add('Standard', () => <ChevronDownIcon />);
