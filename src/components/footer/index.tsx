import React from 'react';
import styled from 'styled-components';

import {
  Row,
  NavLink,
  Link,
} from '../../style/components';

const FooterWrapper = styled.div`
  flex-direction: row;
`;

function Footer() {
  return (
    <Row width="50%" padding="20px" margin="auto">
      <FooterWrapper>
        <NavLink to="/" margin="0 20px">
          Home
        </NavLink>
        <NavLink to="/about" margin="0 20px">
          About
        </NavLink>
        <Link href="https://Twitter.com/0xnow" target="_blank" rel="noopener noreferrer" margin="0 20px" navLink>
          Community
        </Link>
      </FooterWrapper>
    </Row>
  );
}

export default Footer;
