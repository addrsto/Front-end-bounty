import React from 'react';
import { storiesOf } from '@storybook/react';

import Modal from '.';

storiesOf('Modal', module)
  .add('Standard', () => (
    <Modal
      title="Hello"
      toggle={() => console.log('Toggle')}
      isOpen
    >
      <p>
        Lorem ipsum and bidum.
      </p>
    </Modal>
  ));
