import React from "react";
import Webcam from "react-webcam";
import { Button } from "./ui/button";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

const WebcamCapture = ({ onCapturedImage }) => {
    const webcamRef = React.useRef(null);
    const [capturedImage, setCapturedImage] = React.useState(null);

    const capture = React.useCallback(() => {
        const imageSrc = (webcamRef.current as any)?.getScreenshot();
        setCapturedImage(imageSrc);
    }, [webcamRef]);

    const sendDataToParent = () => {
        onCapturedImage(capturedImage);
    };

    return (
        <>
            <div className="flex flex-row">
                <div className="flex flex-col w-80 h-44 p-2">
                    <Webcam
                        audio={false}
                        height={176}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={360}
                        videoConstraints={videoConstraints}
                    />
                    <Button onClick={capture} className="mt-2">Capture photo</Button>
                </div>
                <div className="p-2">
                    {capturedImage && <img src={capturedImage} alt="Captured Image" />}
                    <Button onClick={sendDataToParent} className="mt-2">Upload</Button>
                </div>
            </div>
        </>
    );
};

export default WebcamCapture;