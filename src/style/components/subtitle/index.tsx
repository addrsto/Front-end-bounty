import styled from 'styled-components';

interface SubtitleInterface {
  noMargin?: boolean,
  margin?: string,
}

const Subtitle = styled.h1<SubtitleInterface>`
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => `${props.theme.font.family}, sans-serif`};
  font-weight: ${(props) => props.theme.font.weight.extraBold};
  font-size: 16px;
  line-height: 21px;
  margin: ${(props) => props.margin && props.margin};
  margin: ${(props) => props.noMargin && 0};
`;

export default Subtitle;
