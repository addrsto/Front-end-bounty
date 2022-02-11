import * as Router from 'react-router-dom';
import styled from 'styled-components';

interface NavLinkInterface {
  margin?: string,
  color?: string,
}

const NavLink = styled(Router.NavLink)<NavLinkInterface>`
  font-family: ${(props) => `${props.theme.font.family}, sans-serif`};
  color: ${(props) => (props.color ? props.color : props.theme.colors.brand)};
  text-decoration: none;
  font-size: 14px;
  line-height: 18px;
  font-weight: ${(props) => props.theme.font.weight.semiBold};

  margin: ${(props) => props.margin && props.margin};

  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
`;

export default NavLink;
