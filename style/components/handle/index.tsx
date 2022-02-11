import styled from 'styled-components';

interface HandleInterface {
  noMargin?: boolean,
  margin?: string,
}

const Handle = styled.h1<HandleInterface>`
  color: ${(props) => props.theme.colors.brand};
  font-family: ${(props) => `${props.theme.font.family}, sans-serif`};
  font-weight: ${(props) => props.theme.font.weight.extraBold};
  font-size: 32px;
  margin: ${(props) => props.margin && props.margin};
  margin: ${(props) => props.noMargin && 0};
`;

export default Handle;
