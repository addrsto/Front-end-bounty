import styled from 'styled-components';

interface ICard {
  width?: string;
  margin?: string;
}

const Card = styled.div<ICard>`
  max-width: 35rem;
  width: ${(props) => (props.width ? props.width : '90%')};
  display: block;
  background-color: #fff;
  border-radius: ${(props) => props.theme.border.radius};
  padding: 16px;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.boxShadow};
  margin: ${(props) => (props.margin && props.margin)}
`;

export default Card;
