import React from 'react';
import { storiesOf } from '@storybook/react';

import SearchForm from '.';

storiesOf('SearchForm', module)
  .add('Standard', () => (
    <SearchForm
      handle="Test"
      onChange={(e: React.FormEvent<HTMLInputElement>) => console.log(e.currentTarget.value)}
      isAvailable={false}
      isSearching={false}
      hasBeenChecked={false}
      onRegisterClick={() => console.log('Register click')}
    />
  ))
  .add('Is searching', () => (
    <SearchForm
      handle="Test"
      onChange={(e: React.FormEvent<HTMLInputElement>) => console.log(e.currentTarget.value)}
      isAvailable={false}
      isSearching
      hasBeenChecked={false}
      onRegisterClick={() => console.log('Register click')}
    />
  ))
  .add('Available', () => (
    <SearchForm
      handle="Test"
      onChange={(e: React.FormEvent<HTMLInputElement>) => console.log(e.currentTarget.value)}
      isAvailable
      isSearching={false}
      hasBeenChecked
      onRegisterClick={() => console.log('Register click')}
    />
  ))
  .add('Not available', () => (
    <SearchForm
      handle="Test"
      onChange={(e: React.FormEvent<HTMLInputElement>) => console.log(e.currentTarget.value)}
      isAvailable={false}
      isSearching={false}
      hasBeenChecked
      onRegisterClick={() => console.log('Register click')}
    />
  ));
