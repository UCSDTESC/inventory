import styled, { createGlobalStyle } from 'styled-components'
import { FONT_SIZE, TESC_BLUE } from './constants';
import { BreakpointsType, mediaBreakpointDown } from './breakpoints';

export const GlobalStyle = createGlobalStyle`
  html, body, #app {
    width: 100%;
    height: 100%;
    font-size: ${FONT_SIZE}
  }

  .tesc-blue {
    color: ${TESC_BLUE};
  }
`;

export const HideBelow = (breakpoint: keyof BreakpointsType) => styled.div`
    ${mediaBreakpointDown(breakpoint, `
        display: none !important;
    `)}
`