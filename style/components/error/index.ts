import styled from 'styled-components';

import Text from '../text';

interface IError {
  small?: boolean;
  margin?: string;
  centered?: boolean;
}

const Error = styled(Text)<IError>`
  color: #EF233C;
  font-size: ${(props) => (props.small ? '14px' : '16px')};
  margin: ${(props) => props.margin && props.margin};
  text-align: ${(props) => props.centered && 'center'};
`;

export default Error;
