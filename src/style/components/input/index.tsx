import styled from 'styled-components';

interface InputInterface {
  block?: boolean,
}

const Input = styled.input<InputInterface>`
  font-family: ${(props) => `${props.theme.font.family}, sans-serif`};
  font-size: 14px;
  line-height: 18px;
  font-weight: ${(props) => props.theme.font.weight.medium};

  color: ${(props) => props.theme.colors.primary};

  background-color: ${(props) => props.theme.colors.background};

  border-color: #E7EEF5;
  border-radius: ${(props) => props.theme.border.radius};
  border-style: solid;
  border-width: 2px;

  padding: 8px 10px;

  box-sizing: border-box;

  width: ${(props) => props.block && '100%'};

  &::placeholder {
    color: #CCCCCC;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export default Input;
