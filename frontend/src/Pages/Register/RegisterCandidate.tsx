import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { candidateIMG } from "@/lib/candidateIMG";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";



// Define the shape of the candidate images
const candidateSchema = z.object({
    id: z.number(),
    img: z.string(),
});

// Define the shape of the form data
const formDataSchema = z.object({
    Firstname: z.string().min(2, {
        message: "FirstName must be at least 2 characters.",
    }),
    Middlename: z.string(),
    Lastname: z.string().min(2, {
        message: "LastName must be at least 2 characters.",
    }),
    Citizenshipnum: z.string().min(10, {
        message: "CitizenshipNumber must be at least 10 characters.",
    }),
    Address: z.string().min(2, {
        message: "Address must be at least 2 characters.",
    }),
    Gender: z.enum(["Male", "Female", "Other"]),
    Partyname: z.string().min(2, {
        message: "PartyName must be at least 2 characters.",
    }),
    imgId: z.string().min(1, {
        message: "imgId must be at least 2 characters.",
    }),
});

//Define the type for the candidate image
type CandidateImage = z.infer<typeof candidateSchema>;

// Define the type for the form data
type FormData = z.infer<typeof formDataSchema>;

const RegisterCandidate: React.FC = () => {
    const navigate = useNavigate();
    const form = useForm<FormData>({
        resolver: zodResolver(formDataSchema),
        defaultValues: {
            Firstname: "",
            Middlename: "",
            Lastname: "",
            Citizenshipnum: "",
            Address: "",
            Gender: "Male",
            Partyname: "",
            imgId: "",
        },
    });
    const [backendData, setBackendData] = useState([]);
    React.useEffect(() => {
        axiosInstance.get('/cinfo/')
            .then((res) => {
                console.log(res.data);
                setBackendData(res.data);

            })
    }, []); // Empty dependency array ensures this runs only once
    console.log("backend", backendData);




    const onSubmit = (data: FormData) => {
        console.log(data);

        axiosInstance.post('/cregister/', data)
            .then((res) => {
                console.log(res)
                if (res.data) {
                    console.log(res.data)

                    if (res.data.message === 'candidate registered successfully') {
                        toast({
                            title: "Registration Successfull",
                            description: res.data.message,
                        });
                        localStorage.setItem('token', res.data.token);
                        navigate("/");
                    }
                    else if (res.data.error === 'existing values already existed') {
                        alert("Already registered");
                    }
                }
                else {
                    alert("not registered")
                }
            }).catch((err) => {
                if (err) {
                    console.log(err.response.data)
                    alert("ERROR")
                } else {
                    alert("Server Error")
                }
            });
    };

    const unregisteredImages = candidateIMG.filter((candidate) => {
        return !backendData.some((data) => data.Image === candidate.id.toString());
    });

    console.log("unregistered", unregisteredImages);


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

                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
                        <div className="flex flex-col md:flex-row md:min-w-full gap-4">
                            <FormField
                                control={form.control}
                                name="Firstname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Suresh" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="Middlename"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Middle Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Thapa" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="Lastname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Magar" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="Citizenshipnum"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Citizenship Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="3946562019" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Nagrita number halnu hola.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder=" Lamachaur Pokhara" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter a valid address
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="mr-4">Gender</FormLabel>
                                    <FormControl>
                                        <select {...field}>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </FormControl>
                                    <FormDescription>

                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Partyname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Party Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ghanti parti" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        if swatranta write "swatranta" in this field
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="imgId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Party Logo</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            className="flex flex-col space-y-1"
                                        >
                                            {unregisteredImages.map((candidate: CandidateImage) => (
                                                <FormItem
                                                    key={candidate.id}
                                                    className="flex items-center space-x-3 space-y-0"
                                                >
                                                    <FormControl>
                                                        <RadioGroupItem value={`${candidate.id}`} />
                                                    </FormControl>
                                                    <Avatar>
                                                        <AvatarImage src={candidate.img} alt={`Candidate ${candidate.id}`} />
                                                        <AvatarFallback>{candidate.id}</AvatarFallback>
                                                    </Avatar>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>

                    </form>
                </Form>
            </div>
        </div>
    );
};

export default RegisterCandidate;


