import React, { useState } from "react";
import Webcam from "react-webcam";

import { Button } from "./ui/button";

const WebcamCapture = ({ onCapturedImage }) => {
    const webcamRef = React.useRef(null);
    const [capturedImage, setCapturedImage] = React.useState(null);
    const [base64DataUrl, setBase64DataUrl] = useState('');

    const capture = React.useCallback(() => {
        const imageSrc = (webcamRef.current as any)?.getScreenshot();
        setCapturedImage(imageSrc);
        // Convert the captured image to a base64-encoded data URL
        const canvas = document.createElement('canvas');
        canvas.width = (webcamRef.current as any)?.video.videoWidth;
        canvas.height = (webcamRef.current as any)?.video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage((webcamRef.current as any)?.video, 0, 0);
        const base64DataUrl = canvas.toDataURL('image/jpeg');
        setBase64DataUrl(base64DataUrl);

    }, [webcamRef]);

    const sendDataToParent = () => {
        onCapturedImage(capturedImage);
    };

    return (
        <>
            <div className="flex flex-row m-2 z-10">
                <div className="flex flex-col w-80 h-44 p-2">
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={640}
                        height={480}
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