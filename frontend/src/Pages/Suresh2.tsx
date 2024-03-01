import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const CaptureImage = () => {
    const webcamRef = useRef(null);
    const [image, setImage] = useState(null);

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        console.log(imageSrc);
    };

    const handleUpload = () => {
        if (image) {
            // Convert base64 image data to blob
            const byteCharacters = atob(image.split(",")[1]);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: "image/jpeg" });

            // Create FormData object and append the blob
            const formData = new FormData();
            formData.append("image", blob, "image.jpg");

            // Send the FormData to the backend
            axios
                .post("http://localhost:8000/register/", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } else {
            console.error("No image captured");
        }
    };

    return (
        <div>
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
            <button onClick={capture}>Capture</button>
            <button onClick={handleUpload}>Upload Image</button>
        </div>
    );
};

export default CaptureImage;