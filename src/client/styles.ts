import { createGlobalStyle } from 'styled-components'
import { FONT_SIZE } from './constants';

export const GlobalStyle = createGlobalStyle`
  html, body, #app {
    width: 100%;
    height: 100%;
    font-size: ${FONT_SIZE}
  }
`;