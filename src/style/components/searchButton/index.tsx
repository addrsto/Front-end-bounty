import styled, {
  keyframes,
} from 'styled-components';

const searching = () => keyframes`
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
    case 'available':
      return {
        backgroundColor: '#47E88D',
        color: theme.colors.inverted,
        borderColor: '#47E88D',
        boxShadow: theme.boxShadow,
      };
    case 'taken':
      return {
        backgroundColor: '#FF7F11',
        color: '#FFFFFF',
        borderColor: '#FF7F11',
        boxShadow: theme.boxShadow,
      };
    case 'invalid':
      return {
        backgroundColor: '#DDDDDD',
        color: '#AAAAAA',
        borderColor: '#DDDDDD',
        boxShadow: theme.boxShadow,
      };
    default:
      throw new Error('Unkown style');
  }
}

interface ButtonInterface {
  genre: string,
  block?: boolean,
  isSearching?: boolean,
}

const Button = styled.button<ButtonInterface>`
  width: 112px;
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

  padding: 8px 32px;

  box-sizing: border-box;
  width: ${(props) => props.block && '100%'};

  transition: all 300ms;

  opacity: 1;

  animation-name: ${() => searching()};
  animation-duration: 0.9s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  background-image: ${(props) => props.isSearching
    && 'linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)'};
  background-size: ${(props) => props.isSearching && '2rem 2rem'};

  margin-left: -122px;

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: ${(props) => (props.isSearching ? 'wait' : 'pointer')};
    opacity: ${(props) => !props.isSearching && '0.8'};
    transition: all 300ms;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export default Button;
