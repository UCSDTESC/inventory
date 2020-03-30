import styled from 'styled-components';
import { TESC_BLUE, BORDER_RADIUS, TESC_BLUE_DARKER, MEDIUM_GRAY } from '~/styles/constants';
import { mediaBreakpointDown } from '~/styles/breakpoints';

type Props = {
  light?: boolean
}

const Button = styled.button<Props>`
  background: ${props => props.light ? 'white' : TESC_BLUE};
  color: ${props => props.light ? TESC_BLUE : 'white'};
  width: 100%;
  border-radius: ${BORDER_RADIUS};
  padding: 0.6rem;
  font-size: 1.2rem;
  cursor: pointer;
  border: none;
  position: relative;

  ${mediaBreakpointDown('sm', `
    max-width: none;
  `)}

  &:hover, &:focus {
    color: white;
    background-color: ${TESC_BLUE_DARKER};
    border: none;
    border: none;
  }

  &:disabled {
    background-color: ${MEDIUM_GRAY};

    &:hover {
      background-color: darken($medium-gray, 3%);
    }
  }

  &:empty {
    display: none;
  }
`
export default Button;