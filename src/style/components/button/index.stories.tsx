import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '.';

storiesOf('Button', module)
  .add('Primary', () => (
    <Button
      genre="primary"
      onClick={() => console.log('Button clicked')}
    >
      Click me
    </Button>
  ))
  .add('Primary & Disabled', () => (
    <Button
      genre="primary"
      onClick={() => console.log('Button clicked')}
      disabled
    >
      Do not click me
    </Button>
  ))
  .add('Primary with image', () => (
    <Button
      genre="primary"
      onClick={() => console.log('Button clicked')}
    >
      <span role="img" aria-label="img">
        🎅
      </span>
      {' '}
      Click me
    </Button>
  ))
  .add('Primary & Block', () => (
    <Button
      genre="primary"
      onClick={() => console.log('Button clicked')}
      block
    >
      Click me
    </Button>
  ))
  .add('Secondary', () => (
    <Button
      genre="secondary"
      onClick={() => console.log('Button clicked')}
    >
      Click me
    </Button>
  ))
  .add('Link', () => (
    <Button
      genre="link"
      onClick={() => console.log('Button clicked')}
    >
      Click me
    </Button>
  ))
  .add('Danger', () => (
    <Button
      genre="danger"
      onClick={() => console.log('Button clicked')}
    >
      Danger
    </Button>
  ))
  .add('Outlined', () => (
    <Button
      genre="outlined"
      onClick={() => console.log('Button clicked')}
    >
      Click me
    </Button>
  ))
  .add('Loading', () => (
    <Button
      genre="primary"
      isWaiting
    >
      Waiting...
    </Button>
  ));
