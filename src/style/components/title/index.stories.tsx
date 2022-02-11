import React from 'react';
import { storiesOf } from '@storybook/react';

import Title from '.';

storiesOf('Title', module)
  .add('standard', () => <Title>Hello</Title>);
