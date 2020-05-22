import React, { useEffect } from 'react';
import Webcam from "react-webcam";
import Button, {Props as ButtonProps} from './Button';
import styled from 'styled-components';
import { BORDER_RADIUS } from '~/styles/constants';

type Props = {
  onChange?: (blob: Blob) => void,
  value?: Blob
} & ButtonProps;

const Cam = styled(Webcam)`
  border-radius: ${BORDER_RADIUS};
  width: 100%;
`

const Img = styled.img`
  border-radius: ${BORDER_RADIUS};
`

const PreviewHeader = styled.div`
  border-radius: ${BORDER_RADIUS};
  padding: 1rem;
  opacity: 0.8;
`

enum CameraStates {
  TakeImage,
  PreviewImage
}

const Camera: React.FunctionComponent<Props> = (props) => {
 
  // Reference to the react-webcam instance rendered below.
  const webcamRef = React.useRef(null);

  // Current Camera Setting, defaults to self camera.
  const [facingMode, setFacingMode] = React.useState<VideoFacingModeEnum>("user");

  // Tracks whether there is an alternate camera.
  const [hasEnvCamera, setHasEnvCamera] = React.useState<boolean>(true);

  // Tracks whether we need to show the camera or a preview
  const [cameraState, setCameraState] = React.useState<CameraStates>(CameraStates.TakeImage);

  const [previewImg, setPreviewImg] = React.useState<string>(null);

  useEffect(() => {
    async function checkForCameras() {
      const devices = await navigator.mediaDevices.enumerateDevices();
      setHasEnvCamera(devices.filter(d => d.kind === 'videoinput').length > 1);
    }

    function checkForImage() {
      if (props.value) {
        let reader = new FileReader();

        reader.onload = () => {
          if (reader.result !== 'data:') {
            setCameraState(CameraStates.PreviewImage);
            setPreviewImg(reader.result as string);
          } else {
            setCameraState(CameraStates.TakeImage);
            setPreviewImg(null);
          }
        }; 

        reader.readAsDataURL(props.value);
      }
    }

    checkForImage();
    checkForCameras();
  });

  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      const blob = dataURItoBlob(imageSrc);
      props.onChange(blob);
    },
    [webcamRef]
  );

  const toggleCamera = React.useCallback(() => {
    setFacingMode(
      prevState =>
        prevState === "user"
          ? "environment"
          : "user"
    );
  }, []);

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

    return new Blob([ab], {type: mimeString});
  }

  if (cameraState === CameraStates.TakeImage) {
    return (
      <>
        <Cam 
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode
          }}
        />
        <Button type="button" onClick={capture} light={props.light}>Capture</Button>
  
        {/* Only show toggle button if 2 video inputs were detected */}
        {hasEnvCamera && <Button type="button" onClick={toggleCamera} light={props.light}>Toggle</Button>}
      </>
    );
  } else if (cameraState === CameraStates.PreviewImage) {
    return (
      <div className="card bg-dark text-black">
        <Img className="card-img" src={previewImg} />
        <div className="card-img-overlay">
          <PreviewHeader className="card-title bg-tesc-blue d-flex">
            <h5 className="my-auto">Image Preview</h5>
            <Button 
              type="button" 
              onClick={() => props.onChange(new Blob())} 
              light={true} className="w-auto ml-auto p-1 text-danger">❌</Button>
          </PreviewHeader>
        </div>
      </div>
    )
  }

}

export default Camera;