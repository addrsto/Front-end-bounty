import styled from 'styled-components';

interface RowInterface {
  margin?: string;
  padding?: string;
  width?: string;
  maxWidth?: string;
}

const Row = styled.div<RowInterface>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.width ? props.width : '100%')};
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : '100%')};
  justify-content: flex-start;
  align-items: center;
  flex: 1 1 0%;
  overflow-y: auto;
  overflow-x: hidden;
  margin: ${(props) => props.margin && props.margin};
  padding: ${(props) => props.padding && props.padding};
`;

export default Row;
