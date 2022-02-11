import React from 'react';
import styled from 'styled-components';

import {
  SearchBar,
  SearchButton,
} from '../../style/components';

const SearchFormWrapper = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
`;

interface SearchFormInterface {
  handle: string;
  onChange: Function;
  isSearching: boolean;
  isAvailable: boolean;
  hasBeenChecked: boolean;
  onRegisterClick: Function;
}

function isHandleValid(handle: string): boolean {
  if (handle.length >= 3 && handle.length < 99 && handle.match(/^[a-z0-9-_]+$/) !== null) {
    return true;
  }

  return false;
}

function returnSearchButtonStyle(
  handle: string,
  hasBeenChecked: boolean,
  isAvailable: boolean,
) {
  if (!isHandleValid(handle)) {
    return 'invalid';
  }

  if (!hasBeenChecked) {
    return 'primary';
  }

  if (isAvailable) {
    return 'available';
  }

  if (!isAvailable) {
    return 'taken';
  }

  return 'primary';
}

function returnSearchButtonText(
  handle: string,
  hasBeenChecked: boolean,
  isAvailable: boolean,
) {
  if (handle.length === 0) {
    return 'Search';
  }

  if (!isHandleValid(handle)) {
    return 'Invalid';
  }

  if (!hasBeenChecked) {
    return 'Search';
  }

  if (isAvailable) {
    return 'Register';
  }

  if (!isAvailable) {
    return 'Taken';
  }

  return 'Invalid';
}

function SearchForm(props: SearchFormInterface) {
  const {
    handle,
    onChange,
    isAvailable,
    isSearching,
    hasBeenChecked,
    onRegisterClick,
  } = props;

  return (
    <SearchFormWrapper>
      <SearchBar
        placeholder="satoshi"
        value={handle}
        onChange={(e) => onChange(e)}
        maxLength={25}
        block
      />
      <SearchButton
        genre={returnSearchButtonStyle(handle, hasBeenChecked, isAvailable)}
        isSearching={isSearching}
        disabled={!isAvailable}
        onClick={() => onRegisterClick()}
      >
        {returnSearchButtonText(handle, hasBeenChecked, isAvailable)}
      </SearchButton>
    </SearchFormWrapper>
  );
}

export default SearchForm;
