import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React, { useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { Label } from "@/components/ui/label";

const RegisterCandidate: React.FC = () => {
    const [name, setName] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!file) {
            console.error('No file selected');
            return;
        }
        console.log("name", name);
        console.log("image", file);


        const formData = new FormData();
        formData.append('CandidateName', name);
        formData.append('Image', file);
        console.log(formData);

        axiosInstance
            .post("/cregister/", formData, {
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
    };

    return (

        <div className="flex flex-col justify-center items-center ">
            <div className="flex flex-row justify-center">
                <div className="size-12">
                    <img src="/Logo.png" alt="nepal logo" className="w-full h-full' pr-2 " />
                </div>
                <h1 className="font-semibold font-sans text-center text-2xl mb-3">
                    Welcome To<span className="text-red-500"> Candidate Registration </span> page
                </h1>
            </div>
            <div className="flex flex-col justify-center items-center my-5 px-3">

                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
                    <Input
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={handleNameChange}
                    />
                    <Label>
                        Select Image
                        <input type="file" onChange={handleFileChange} />
                    </Label>

                    <Button type="submit">Upload Image</Button>
                </form>
            </div>
        </div>
    );
};

export default RegisterCandidate;


