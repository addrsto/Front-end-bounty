import styled from 'styled-components';

interface FlexInterface {
  margin?: string,
  padding?: string,
  width?: string,
}

const Flex = styled.div<FlexInterface>`
  display: flex;
  width: ${(props) => (props.width ? props.width : '100%')};
  margin: ${(props) => props.margin && props.margin};
  padding: ${(props) => props.padding && props.padding};
  align-items: center;
`;

export default Flex;
