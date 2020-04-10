import React from 'react';
import Webcam from "react-webcam";
import Button, {Props as ButtonProps} from './Button';
import styled from 'styled-components';
import { BORDER_RADIUS } from '~/styles/constants';

type Props = {
  onChange?: (blob: Blob) => void;
} & ButtonProps;

const Cam = styled(Webcam)`
  border-radius: ${BORDER_RADIUS};
  width: 100%;
`

const Camera: React.FunctionComponent<Props> = (props) => {
 
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      const blob = dataURItoBlob(imageSrc);
      props.onChange(blob);
    },
    [webcamRef]
  );

  function dataURItoBlob(uri: string): Blob {
    var byteString = atob(uri.split(',')[1]);

    // separate out the mime component
    var mimeString = uri.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    //New Code
    return new Blob([ab], {type: mimeString});
  }

  return (
    <>
      <Cam 
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <Button type="button" onClick={capture} light={props.light}>Capture</Button>
    </>
  );
}

export default Camera;