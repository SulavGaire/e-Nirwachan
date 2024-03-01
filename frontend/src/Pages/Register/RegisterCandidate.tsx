import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import axios from 'axios';


const formSchema = z.object({
    CandidateName: z.string().min(2, {
        message: "CandidateName must be at least 2 characters.",
    }),
    image: z.string().refine((data) => { console.log(data); return true; }, { message: "Image is required." }),
});

const RegisterCandidate = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            CandidateName: "",
            image: undefined,
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        const formData = new FormData();
        formData.append("CandidateName", values.CandidateName);
        if (values.image) {
            formData.append("Image", values.image);
        }
        axios
            .post("http://192.168.16.101:8000/register/", formData, {
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
    }

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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="CandidateName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Candidate Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Suresh" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormDescription>Input your flag image or symbol </FormDescription>
                                    <FormControl>
                                        <Input type="file" accept='image/*' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="py-5">Submit</Button>

                    </form>
                </Form>
            </div>
        </div>

    )
}

export default RegisterCandidate


