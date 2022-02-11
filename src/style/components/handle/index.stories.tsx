import React from 'react';
import { storiesOf } from '@storybook/react';

import Handle from '.';

storiesOf('Handle', module)
  .add('standard', () => <Handle>satoshi</Handle>);
