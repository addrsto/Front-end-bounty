import styled from 'styled-components';

interface LinkInterface {
  noMargin?: boolean,
  margin?: string,
  navLink?: boolean,
}

const Link = styled.a<LinkInterface>`
  color: ${(props) => props.theme.colors.brand};
  font-family: ${(props) => `${props.theme.font.family}, sans-serif`};
  font-weight: ${(props) => (props.navLink ? props.theme.font.weight.semiBold : props.theme.font.weight.medium)};
  font-size: 14px;
  text-decoration: none;
  margin: ${(props) => props.margin && props.margin};
  margin: ${(props) => props.noMargin && 0};

  &:hover {
    text-decoration: underline;
  }
`;

export default Link;
