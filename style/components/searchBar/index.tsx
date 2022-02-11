import styled from 'styled-components';

interface SearchBarInterface {
  block?: boolean;
}

const SearchBar = styled.input<SearchBarInterface>`
  font-family: ${(props) => `${props.theme.font.family}, sans-serif`};
  font-size: 18px;
  line-height: 23px;
  font-weight: ${(props) => props.theme.font.weight.semiBold};

  color: ${(props) => props.theme.colors.primary};

  background-color: ${(props) => props.theme.colors.background};

  border-color: ${(props) => props.theme.colors.background};
  border-radius: ${(props) => props.theme.border.radius};
  border-style: solid;
  border-width: 1px;

  padding: 10px 12px;

  box-sizing: border-box;

  box-shadow: ${(props) => props.theme.boxShadow};

  width: ${(props) => props.block && '100%'};

  text-transform: lowercase;

  &::placeholder {
    color: #CCCCCC;
  }

  &:focus {
    outline: none;
  }
`;

export default SearchBar;
