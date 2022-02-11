import styled from 'styled-components';

const Label = styled.label`
  display: block;
  font-size: 12px;
  line-height: 16px;
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => `${props.theme.font.family}, sans-serif`};
  font-weight: ${(props) => props.theme.font.weight.bold};
  margin-bottom: 0.5em;
  align-self: flex-start;
`;

export default Label;
