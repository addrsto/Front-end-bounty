import styled from 'styled-components';

import Text from '../text';

interface IValid {
  small?: boolean;
  margin?: string;
  centered?: boolean;
}

const Valid = styled(Text)<IValid>`
  color: #47E88D;
  font-size: ${(props) => (props.small ? '14px' : '16px')};
  margin: ${(props) => props.margin && props.margin};
  text-align: ${(props) => props.centered && 'center'};
`;

export default Valid;
