import styled, {
  keyframes,
} from 'styled-components';

const loading = () => keyframes`
  from {
    background-position: 2rem 0;
  }

  to {
    background-position: 0 0;
  }
`;

function getButtonStyle(theme: any, genre: string) {
  switch (genre) {
    case 'primary':
      return {
        backgroundColor: theme.colors.brand,
        color: theme.colors.inverted,
        borderColor: theme.colors.brand,
        boxShadow: theme.boxShadow,
      };
    case 'outlined':
      return {
        backgroundColor: 'transparent',
        color: theme.colors.brand,
        borderColor: theme.colors.brand,
        boxShadow: theme.boxShadow,
      };
    case 'secondary':
      return {
        backgroundColor: theme.colors.secondary,
        color: theme.colors.inverted,
        borderColor: theme.colors.secondary,
        boxShadow: theme.boxShadow,
      };
    case 'link':
      return {
        backgroundColor: 'transparent',
        color: theme.colors.brand,
        borderColor: 'transparent',
        boxShadow: 'none',
      };
    case 'danger':
      return {
        backgroundColor: 'transparent',
        color: '#EF233C',
        borderColor: 'transparent',
        boxShadow: 'none',
      };
    default:
      throw new Error('Unkown style');
  }
}

interface ButtonInterface {
  genre: string,
  block?: boolean,
  isWaiting?: boolean,
  padding?: string;
}

const Button = styled.button<ButtonInterface>`
  font-family: ${(props) => `${props.theme.font.family}, sans-serif`};
  font-size: 12px;
  line-height: 16px;
  font-weight: ${(props) => props.theme.font.weight.bold};

  color: ${(props) => getButtonStyle(props.theme, props.genre).color};

  text-transform: uppercase;

  border-radius: ${(props) => props.theme.border.radius};
  border-color: ${(props) => getButtonStyle(props.theme, props.genre).borderColor};
  border-style: ${(props) => props.theme.border.style};
  border-width: ${(props) => props.theme.border.width};

  background-color: ${(props) => getButtonStyle(props.theme, props.genre).backgroundColor};

  box-shadow: ${(props) => getButtonStyle(props.theme, props.genre).boxShadow};

  padding: ${(props) => (props.padding ? props.padding : '8px 32px')};

  box-sizing: border-box;
  width: ${(props) => props.block && '100%'};

  transition: all 300ms;

  opacity: 1;

  animation-name: ${() => loading()};
  animation-duration: 0.9s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  background-image: ${(props) => props.isWaiting
    && 'linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)'};
  background-size: ${(props) => props.isWaiting && '2rem 2rem'};

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: ${(props) => (props.isWaiting ? 'wait' : 'pointer')};
    opacity: ${(props) => !props.isWaiting && '0.8'};
    transition: all 300ms;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export default Button;
