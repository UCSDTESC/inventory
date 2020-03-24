import Button from './Button';
import React from 'react';

type Props = {
  href?: string;
  target?: string;
}

const LinkButton: React.FunctionComponent<Props> = (props) => {
  return (
    <Button as="a" {...props} >
      {props.children}
    </Button>
  );
}

export default LinkButton;