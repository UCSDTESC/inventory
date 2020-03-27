export type BreakpointsType = {
  'xs': string,
  'sm': string,
  'sm-md': string,
  'md': string,
  'lg': string,
  'lg-xl': string,
  'xl': string,
  'countdown': string
};

export const breakpoints: BreakpointsType = {
  'xs': '0px',
  'sm': '576px',
  'sm-md': '600px',
  'md': '768px',
  'lg': '992px',
  'lg-xl': '1100px',
  'xl': '1200px',
  'countdown': '1000px'
}

export const mediaBreakpointDown = (width: keyof BreakpointsType, css: string) => `
  @media (max-width: ${breakpoints[width]}) {
      ${css}
  }
`

export const mediaBreakpointUp = (width: keyof BreakpointsType, css: string) => `
  @media (min-width: ${breakpoints[width]}) {
      ${css}
  }
`