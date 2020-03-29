import Button from './Button';
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

type Props = {
  href?: string;
  target?: string;
  className?: string;
  isExternal?: boolean;
} & LinkProps

const LinkButton: React.FunctionComponent<Props> = (props) => {
  return (
    <Button as={props.isExternal ? "a" : Link} {...props} className={`d-inline-block w-auto ${props.className}`} >
      {props.children}
    </Button>
  );
}

export default LinkButton;