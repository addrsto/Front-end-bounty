import React from 'react';
import {
  Box,
} from 'reflexbox';

import {
  Title,
  Text,
Link,
  Row,
} from '../../style/components';

function About() {
  return (
    <Row width="50%" margin="auto">
      <Box width={1}>
        <Title>
          Welcome to Keychain&apos;s Handles
        </Title>
      </Box>
      <Box width={1}>
        <Text>
          The best way to send and receive your favorite crypto without touching any long addresses. Just send your link for the cryptocurrency you&apos;re transacting with to friends or customers and end all hassles from using long, complicated addresses. One tap and their wallet will open up with your address entered in, automatically setting the transaction amount, if set. Compatible with any BTC/ETH wallet following BIP20 for Bitcoin or EIP 67/681 for Ethereum.
        </Text>
      </Box>
<Link href="mailto: pr0@keychain.me" target="_blank" rel="noopener noreferrer" margin="0 20px" navLink>
          Contact us
        </Link>
<br></br>
<Link href="https://keychain.me" target="_blank" rel="noopener noreferrer" margin="0 20px" navLink>
          Check out our other projects
        </Link>
    </Row>
  );
}

export default About;
