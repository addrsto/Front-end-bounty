import React from 'react';
import { storiesOf } from '@storybook/react';

import PlusIcon from '.';

storiesOf('Icons/Plus', module)
  .add('White', () => <PlusIcon white />)
  .add('Standard', () => <PlusIcon />);
