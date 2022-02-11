import React from 'react';
import styled from 'styled-components';
import {
  Flex,
  Box,
} from 'reflexbox/styled-components';
import copy from 'copy-to-clipboard';

import {
  Button,
} from '../../style/components';

import Coins from '../../assets/coins/coins.json';

const NameLabel = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => `${props.theme.font.family}, sans-serif`};
  font-weight: ${(props) => props.theme.font.weight.extraBold};
  font-size: 14px;
  line-height: 18px;
`;

const AddressLabel = styled.span`
  color: ${(props) => props.theme.colors.secondary};
  font-family: ${(props) => `${props.theme.font.family}, sans-serif`};
  font-weight: ${(props) => props.theme.font.weight.semiBold};
  font-size: 11px;
  line-height: 14px;
`;

const RemoveButton = styled(Button)`
  padding: 0;
`;

const RemoveBox = styled(Box)`
  display: inline-flex;
  flex-direction: row-reverse;
`;

const LabelBox = styled(Box)`
  display: inline-flex;
`;

const LogoBox = styled(Box)`
  text-align: center;
`;

const CopyBox = styled(Box)`
  display: inline-flex;
  flex-direction: row-reverse;
`;

const Logo = styled.img`
  height: 48px;
`;

interface IWrapper {
  withBackground?: boolean;
  clickable?: boolean;
}

const Wrapper = styled(Flex)<IWrapper>`
  justify-content: space-evenly;
  width: 100%;
  background-color: ${(props) => (props.withBackground && props.theme.colors.light)};
  border-radius: ${(props) => (props.withBackground && props.theme.border.radius)};
  margin: ${(props) => (props.withBackground && '14px 0 0 0')};
  cursor: ${(props) => (props.clickable && 'pointer')};
`;

interface AddressProps {
  logo: string;
  name: string;
  address: string;
  onRemove?: Function;
  withBackground?: boolean;
  clickable?: boolean;
  canCopy?: boolean;
  handle?: string;
}

function Address(props: AddressProps) {
  const {
    logo,
    name,
    address,
    onRemove,
    withBackground,
    clickable,
    canCopy,
    handle,
  } = props;

  const coins = Coins as CoinsInterface;
  const { ticker } = coins[name.toUpperCase()];
  const path = window.location.pathname;

  return (
    <Wrapper
      flexWrap="wrap"
      alignItems="center"
      padding="10px 0"
      withBackground={withBackground}
      clickable={clickable}
      onClick={() => {
        if (clickable) {
          window.location.replace(`${path}/${ticker}`);
        }
      }}
    >
      <LogoBox width={1 / 6}>
        <Logo
          src={logo}
          alt={name}
        />
      </LogoBox>
      <Box width={5 / 6}>
        <Box width={1 / 1}>
          <LabelBox width={1 / 2} pl="10px">
            <NameLabel>
              {name}
            </NameLabel>
          </LabelBox>
          {onRemove && (
          <RemoveBox width={1 / 2}>
            <RemoveButton genre="danger" onClick={() => onRemove()}>
              Remove
            </RemoveButton>
          </RemoveBox>
          )}
        </Box>
        <Flex flexWrap="wrap">
          <Box width={1 / 2} pl="10px">
            <AddressLabel id={name}>
              {`${address}`}
            </AddressLabel>
          </Box>
          {canCopy && (
          <CopyBox width={1 / 2}>
            <Button
              padding="0"
              genre="link"
              onClick={() => {
                copy(`https://addrs.to/${handle}/${name}`);
              }}
            >
              Copy Link
            </Button>
          </CopyBox>
          )}
        </Flex>
      </Box>
    </Wrapper>
  );
}

export default Address;
