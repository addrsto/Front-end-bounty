import styled from 'styled-components';

interface ColInterface {
  margin?: string,
  padding?: string,
  width?: string,
}

const Col = styled.div<ColInterface>`
  width: ${(props) => (props.width ? props.width : '100%')};
  margin: ${(props) => props.margin && props.margin};
  padding: ${(props) => props.padding && props.padding};
`;

export default Col;
