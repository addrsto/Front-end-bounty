import React from 'react';
import { storiesOf } from '@storybook/react';

import Link from '.';

storiesOf('Link', module)
  .add('Standard', () => (
    <Link href="*">
      Click me
    </Link>
  ));
