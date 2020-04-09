import React from 'react';
import Cam from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

type Props = {
  onChange?: (blob: Blob) => void;
}

const Camera: React.FunctionComponent<Props> = (props) => {
 
  function onTakePhoto(dataURI: string) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return props.onChange(new Blob([ab], {type: mimeString})); 
  }

  return (
    <Cam 
      onTakePhoto={onTakePhoto}
    />
  );
}

export default Camera;