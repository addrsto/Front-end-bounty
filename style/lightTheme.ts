import { DefaultTheme } from 'styled-components';

const lightTheme: DefaultTheme = {
  font: {
    family: 'HKGrotesk',
    weight: {
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      extraBold: 800,
      black: 900,
    },
  },
  border: {
    radius: '12px',
    style: 'solid',
    width: '1px',
  },
  colors: {
    brand: '#59ADFB',
    primary: '#354356',
    secondary: '#5D6A77',
    inverted: '#fff',
    light: '#f7f8f9',
    background: '#fff',
  },
  boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)',
};

export default lightTheme;
