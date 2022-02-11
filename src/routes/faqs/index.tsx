/* eslint-disable react/no-array-index-key */

import React from 'react';
import {
  Box,
} from 'reflexbox';

import {
  Title,
  Subtitle,
  Text,
  Row,
} from '../../style/components';

import FaqsFile from '../../assets/faqs/faqs.json';

interface FaqInterface {
  q: string;
  a: string;
}

function Faqs() {
  const faqs: FaqInterface[] = FaqsFile;

  return (
    <Row width="50%" margin="auto">
      <Box width={1}>
        <Title>
          Frequently Asked Questions
        </Title>
      </Box>
      {faqs.map((faq, key) => (
        <Box width={1} key={`faq${key}`}>
          <Subtitle>
            {faq.q}
          </Subtitle>
          <Text>
            {faq.a}
          </Text>
        </Box>
      ))}
    </Row>
  );
}

export default Faqs;
