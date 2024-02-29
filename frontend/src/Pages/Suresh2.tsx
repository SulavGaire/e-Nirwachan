import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const CaptureImage: React.FC = () => {
    const webcamRef = useRef<Webcam>(null);
    const [image, setImage] = React.useState('');

    const capture = () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            // Send the captured image to the backend
            sendImageToBackend(imageSrc);
            setImage(imageSrc);
        }
    };

    const sendImageToBackend = (imageData: string) => {
        console.log(imageData);
        // Create FormData object
        const formData = new FormData();
        // Append the image data
        formData.append('image', imageData);
        console.log("{Formdata}", formData);
        // Make a POST request to your backend
        axios.post('http://192.168.16.101:8000/register/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log(response.data);
                // Handle response as needed
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle error
            });
    };

    return (
        <div>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
            />
            <button onClick={capture}>Capture</button>
            <img src={image} alt="Captured Image" />
        </div>
    );
};

export default CaptureImage;