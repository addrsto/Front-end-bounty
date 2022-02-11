import styled from 'styled-components';

interface TitleInterface {
  noMargin?: boolean,
  margin?: string,
}

const Title = styled.h1<TitleInterface>`
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => `${props.theme.font.family}, sans-serif`};
  font-weight: ${(props) => props.theme.font.weight.extraBold};
  font-size: 22px;
  line-height: 29px;
  margin: ${(props) => props.margin && props.margin};
  margin: ${(props) => props.noMargin && 0};
`;

export default Title;
