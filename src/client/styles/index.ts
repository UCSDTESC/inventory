import styled, { createGlobalStyle } from 'styled-components'
import { FONT_SIZE, TESC_BLUE, BORDER_RADIUS_LG } from './constants';
import { BreakpointsType, mediaBreakpointDown } from './breakpoints';

export const GlobalStyle = createGlobalStyle`

  html, body, #app {
    width: 100%;
    height: 100%;
    background: #F3F3FD;
    font-size: ${FONT_SIZE};
    font-family: 'Lato', sans-serif;
  }

  a {
    &:hover {
      text-decoration: none !important;
    }
  }

  .tesc-blue {
    color: ${TESC_BLUE};
  }

  .bg-tesc-blue {
    background: ${TESC_BLUE};
    color: white;
  }

  .border-top-0 {
    border-top: hidden !important;
  }
`;

export const Rounded = styled.div.attrs(props => ({
  className: `shadow-sm ${props.className}`
}))`
  border-radius: ${BORDER_RADIUS_LG};
  padding: 1rem;
`

export const HideBelow = (breakpoint: keyof BreakpointsType) => styled.div`
    ${mediaBreakpointDown(breakpoint, `
        display: none !important;
    `)}
`