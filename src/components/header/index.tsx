import React from 'react';
import styled from 'styled-components';
import {
  Flex,
  Box,
} from 'reflexbox/styled-components';

import { ReactComponent as LogoFile } from '../../assets/img/logo.svg';

const BoxLogo = styled(Box)`
  text-align: center;
`;

const Logo = styled(LogoFile)`
  width: 64px;
`;

function Header() {
  return (
    <Flex>
      <BoxLogo width={1}>
        <Logo />
      </BoxLogo>
    </Flex>
  );
}

export default Header;
