import React, {
  useState,
} from 'react';

import styled from 'styled-components';

import {
  Button,
} from '../index';

import ChevronDown from '../icons/chevronDown';

interface DropdownInterface {
  block?: boolean,
  coins: CoinsInterface,
  initialLabel: string,
  onSelect: Function,
}

interface ListInterface {
  isOpen: boolean,
}

const List = styled.div<ListInterface>`
  z-index: 10;
  transform-origin: 50% 0px;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: all 0.2s ease-in-out 0s;
  position: absolute;
  transform: ${(props) => (props.isOpen ? 'scaleY(1)' : 'scaleY(0)')};
  transition: all 0.2s ease-in-out 0s;
  border: none;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: ${(props) => props.theme.border.radius};
  padding: 8px;
  box-sizing: border-box;
  width: 100%;
  max-height: 250px;
  overflow: auto;
`;

const Option = styled.div`
  font-family: ${(props) => props.theme.font.family};
  font-size: 14.5px;
  font-weight: ${(props) => props.theme.font.weight.semiBold};

  color: ${(props) => props.theme.colors.primary};
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  padding: 4px 16px;

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.brand};
  }
`;

const Logo = styled.img`
  height: 26px;
  vertical-align: middle;
  margin: 0px 6px;
  border-radius: 50%;
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

function Dropdown(props: DropdownInterface) {
  const {
    block,
    coins,
    initialLabel,
    onSelect,
  } = props;

  const [isOpen, toggle] = useState(false);
  const [currentValue, setCurrentValue] = useState(initialLabel);

  return (
    <DropdownWrapper>
      <Button
        genre="primary"
        onClick={() => toggle(!isOpen)}
        block={block}
        padding="8px 12px"
      >
        {
        currentValue !== initialLabel
          && <Logo alt={currentValue} src={coins[currentValue].logo} />
        }
        {currentValue}
        {' '}
        <ChevronDown white />
      </Button>
      <List isOpen={isOpen}>
        {Object.keys(coins).map((token) => (
          <Option
            key={token}
            role="button"
            tabIndex={0}
            onClick={() => {
              setCurrentValue(token);
              toggle(!isOpen);
              onSelect(token);
            }}
            onKeyPress={() => {
              setCurrentValue(token);
              toggle(!isOpen);
              onSelect(token);
            }}
          >
            <Logo alt={token} src={coins[token].logo} />
            <br></br>{token}
          </Option>
        ))}
      </List>
    </DropdownWrapper>
  );
}

export default Dropdown;
