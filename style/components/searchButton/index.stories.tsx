import React from 'react';
import { storiesOf } from '@storybook/react';

import SearchButton from '.';

storiesOf('SearchButton', module)
  .add('Search', () => (
    <SearchButton
      genre="primary"
      onClick={() => console.log('Button clicked')}
    >
      Search
    </SearchButton>
  ))
  .add('Searching', () => (
    <SearchButton
      genre="primary"
      onClick={() => console.log('Button clicked')}
      isSearching
    >
      Searching...
    </SearchButton>
  ))
  .add('Valid', () => (
    <SearchButton
      genre="valid"
      onClick={() => console.log('Button clicked')}
    >
      Valid
    </SearchButton>
  ))
  .add('Taken', () => (
    <SearchButton
      genre="taken"
      onClick={() => console.log('Button clicked')}
      disabled
    >
      Taken
    </SearchButton>
  ));
