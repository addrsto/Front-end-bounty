import styled from 'styled-components';

interface IIcon {
  width?: string;
}

const Icon = styled.img<IIcon>`
  width: ${(props) => (props.width ? props.width : '32px')};
  border-radius: 100%;
`;

export default Icon;
