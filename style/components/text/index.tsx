import styled from 'styled-components';

interface TextInterface {
  noMargin?: boolean;
  margin?: string;
  centered?: boolean;
  small?: boolean;
}

const Text = styled.p<TextInterface>`
  color: ${(props) => props.theme.colors.secondary};
  font-family: ${(props) => `${props.theme.font.family}, sans-serif`};
  font-size: ${(props) => (props.small ? '14px' : '16px')};
  font-weight: ${(props) => props.theme.font.weight.medium};
  margin: ${(props) => props.margin && props.margin};
  margin: ${(props) => props.noMargin && 0};
  text-align: ${(props) => props.centered && 'center'};
`;

export default Text;
