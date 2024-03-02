import FingrePrint from '@/components/FingrePrint';
import WebcamCapture from '@/components/WebcamComponent';
import { motion } from 'framer-motion'
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import VotingComponent from '@/components/voting/VotingComponent';
import axiosInstance from '@/lib/axiosInstance';


const steps = [
    {
        id: 'Step 1',
        name: 'Image capture',
    },
    {
        id: 'Step 2',
        name: 'FingrePrint Capture',
    },
    {
        id: 'Step 3',
        name: 'Voting',
    }
]

const options = [
    { value: 'Aakhil', avatar: 'https://th.bing.com/th/id/OIP.PPJ5FAl38tVVP-qGavD8tQHaE4?rs=1&pid=ImgDetMain', alt: 'Aakhil' },
    { value: 'Nebi', avatar: 'https://th.bing.com/th/id/OIP.tAXbbQpns_qJ1bk_ZMy-9QAAAA?rs=1&pid=ImgDetMain', alt: 'Nebi' },
    { value: 'Krantikari', avatar: 'https://th.bing.com/th/id/OIP.DauOLnEL1Lp9zx8pmUNQkwHaE0?rs=1&pid=ImgDetMain', alt: 'Krantikari' }
];

function Voting() {
    const [id, setID] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [votingData, setVotingData] = useState<string>('');
    const [previousStep, setPreviousStep] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const delta = currentStep - previousStep

    const handleCapturedFingrePrint = (id: string) => {
        console.log('Received data from fingre:', id);
        setID(id);
    };

    const handleCapturedImage = (data: string) => {
        console.log('Received data from image:', data);
        setImage(data);
    };
    const handleCapturedVotingData = (votingDataa) => {
        console.log('Received data from voting:', votingDataa);
        setVotingData(votingDataa)
        const dataToSend = {
            "group": votingDataa,
            "candidate_name": "Aakhil",
            "token": sessionStorage.getItem("token"),
        };
        const token = sessionStorage.getItem("token")

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        console.log("FORMDATA:", dataToSend);
        console.log("token", sessionStorage.getItem("token"))
        axiosInstance
            .post("/vote/", dataToSend, {
                headers
            })
            .then((response) => {
                console.log(response.data);
                sessionStorage.removeItem("token");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    console.log("Current Step : ", currentStep);

    const next = async () => {


        if (currentStep < steps.length - 1) {
            if (currentStep === 0) {
                if (image === '') {
                    alert("Please capture your Image");
                    return;
                }
            }
            if (currentStep === 1) {
                if (sessionStorage.getItem("token") === null) {
                    alert("Please capture your fingreprint");
                    return;
                }
                if (id === '') {
                    alert("Please capture your fingreprint");
                    return;
                }
                if (id) {
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
                    formData.append("imageid", blob, "image.jpg");
                    formData.append("fingerid", id);
                    // formData.append("votingdata", "apple");
                    console.log("FORMDATA:", formData);
                    axiosInstance
                        .post("/auth/", formData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        })
                        .then((response) => {
                            console.log(response.data);
                            sessionStorage.setItem("token", response.data.token);
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                        });
                }
            }
            if (currentStep === 2) {
                console.log("Voting Data : ", votingData);
                if (votingData === '') {
                    alert("Please capture your fingreprint");
                    return;
                }
            }

            setPreviousStep(currentStep)
            setCurrentStep(step => step + 1)
        }
    }

    const prev = () => {
        if (currentStep > 0) {
            setPreviousStep(currentStep)
            setCurrentStep(step => step - 1)
        }
    }
    return (
        <div>
            <section className=' inset-0 flex flex-col justify-between p-6'>
                {/* steps */}
                <div className="flex flex-row justify-center">
                    <h1 className="font-semibold font-sans text-center text-3xl p-5 mb-5">
                        Welcome To <span className='text-red-500'>Voting</span> Page
                    </h1>
                </div>
                <nav aria-label='Progress'>
                    <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
                        {steps.map((step, index) => (
                            <li key={step.name} className='md:flex-1'>
                                {currentStep > index ? (
                                    <div className='group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                                        <span className='text-sm font-medium text-sky-600 transition-colors '>
                                            {step.id}
                                        </span>
                                        <span className='text-sm font-medium'>{step.name}</span>
                                    </div>
                                ) : currentStep === index ? (
                                    <div
                                        className='flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                                        aria-current='step'
                                    >
                                        <span className='text-sm font-medium text-sky-600'>
                                            {step.id}
                                        </span>
                                        <span className='text-sm font-medium'>{step.name}</span>
                                    </div>
                                ) : (
                                    <div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                                        <span className='text-sm font-medium text-gray-500 transition-colors'>
                                            {step.id}
                                        </span>
                                        <span className='text-sm font-medium'>{step.name}</span>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>

                {currentStep === 0 && (
                    <motion.div
                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <div className='p-2 my-6'>
                            <h2 className='text-xl font-semibold leading-7 text-gray-900'>
                                Image capture
                            </h2>
                            <p className='mt-1 text-sm leading-6 text-gray-600 '>
                                Please your capture image for verifacation  purpose.
                            </p>
                        </div>
                        <div className='flex flex-col justify-center items-center'>

                            <WebcamCapture onCapturedImage={handleCapturedImage} />

                            <div className='m-1 z-0'>
                                <Label>Uploaded Image</Label>
                                <img src={image}></img>
                            </div>
                        </div>
                    </motion.div>
                )}

                {currentStep === 1 && (
                    <motion.div
                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <div className='p-2 my-6'>
                            <h2 className='text-xl font-semibold leading-7 text-gray-900'>
                                Fingreprint capture
                            </h2>
                            <p className='mt-1 text-sm leading-6 text-gray-600 '>
                                Please your place your fingre in sensor.
                            </p>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <FingrePrint uses='Voting' onCapturedFingrePrint={handleCapturedFingrePrint} />
                        </div>
                    </motion.div>
                )}

                {currentStep === 2 && (
                    <motion.div
                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <div className='p-2 my-6'>
                            <h2 className='text-xl font-semibold leading-7 text-gray-900'>
                                Voting
                            </h2>
                            <p className='mt-1 text-sm leading-6 text-gray-600 '>
                                Use your right to vote right.
                            </p>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <VotingComponent onCapturedVotingData={handleCapturedVotingData} options={options} />
                        </div>
                    </motion.div>
                )}

                {/* Navigation */}
                <div className='mt-8 pt-5'>
                    <div className='flex justify-between'>
                        <button
                            type='button'
                            onClick={prev}
                            disabled={currentStep === 0}
                            className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='h-6 w-6'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M15.75 19.5L8.25 12l7.5-7.5'
                                />
                            </svg>
                        </button>
                        <button
                            type='button'
                            onClick={next}
                            disabled={currentStep === steps.length - 1}
                            className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='h-6 w-6'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M8.25 4.5l7.5 7.5-7.5 7.5'
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Voting;
