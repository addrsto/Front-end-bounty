import {
  createGlobalStyle,
} from 'styled-components';

import HKGroteskLight from '../assets/fonts/HKGrotesk-Light.ttf';
import HKGroteskRegular from '../assets/fonts/HKGrotesk-Regular.ttf';
import HKGroteskMedium from '../assets/fonts/HKGrotesk-Medium.ttf';
import HKGroteskSemiBold from '../assets/fonts/HKGrotesk-SemiBold.ttf';
import HKGroteskBold from '../assets/fonts/HKGrotesk-Bold.ttf';
import HKGroteskExtraBold from '../assets/fonts/HKGrotesk-ExtraBold.ttf';
import HKGroteskBlack from '../assets/fonts/HKGrotesk-Black.ttf';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'HKGrotesk';
    src: url(${HKGroteskLight});
    font-weight: 300;
  }

  @font-face {
    font-family: 'HKGrotesk';
    src: url(${HKGroteskRegular});
    font-weight: 400;
  }

  @font-face {
    font-family: 'HKGrotesk';
    src: url(${HKGroteskMedium});
    font-weight: 500;
  }

  @font-face {
    font-family: 'HKGrotesk';
    src: url(${HKGroteskSemiBold});
    font-weight: 600;
  }

  @font-face {
    font-family: 'HKGrotesk';
    src: url(${HKGroteskBold});
    font-weight: 700;
  }

  @font-face {
    font-family: 'HKGrotesk';
    src: url(${HKGroteskExtraBold});
    font-weight: 800;
  }

  @font-face {
    font-family: 'HKGrotesk';
    src: url(${HKGroteskBlack});
    font-weight: 900;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    background-color: #f3f5f9;
    -webkit-font-smoothing: antialiased;
  }

  body {
    padding: 3em 0;
  }

  @media screen and (max-width: 600px) {
    body {
      padding: 1em 0;
    }
  }
`;

export default GlobalStyle;
