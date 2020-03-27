import styled, { createGlobalStyle } from 'styled-components'
import { FONT_SIZE } from './constants';
import { BreakpointsType, mediaBreakpointDown } from './breakpoints';

export const GlobalStyle = createGlobalStyle`
  html, body, #app {
    width: 100%;
    height: 100%;
    font-size: ${FONT_SIZE}
  }
`;

export const HideBelow = (breakpoint: keyof BreakpointsType) => styled.div`
    ${mediaBreakpointDown(breakpoint, `
        display: none !important;
    `)}
`