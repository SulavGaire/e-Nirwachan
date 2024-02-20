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
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import WebcamCapture from "./WebcamComponent"


const formSchema = z.object({
    FirstName: z.string().min(2, {
        message: "FirstName must be at least 2 characters.",
    }),
    LastName: z.string().min(2, {
        message: "LastName must be at least 2 characters.",
    }),
    CitizenshipNumber: z.string().min(10, {
        message: "CitizenshipNumber must be at least 10 characters.",
    }),
})

export function Register() {
    const [progress, setProgress] = useState(1)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            FirstName: "",
            LastName: "",
            CitizenshipNumber: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setProgress(33);
        console.log(values);
        < WebcamCapture />
    }

    return (
        <div className=" flex-col justify-center items-center px-3">
            <div className="flex flex-row justify-center">
                <h1 className="font-semibold font-sans text-center text-2xl mb-3">
                    Welcome To Voter Pre-Registration
                </h1>
            </div>
            <div className="justify-items-center">
                <Form {...form}>
                    {/* <p>Progress Bar</p> */}
                    <Progress className="mb-3" value={progress} />
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
                        <FormField
                            control={form.control}
                            name="FirstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>FirstName</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ram" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="LastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>LastName</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Magar" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="CitizenshipNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Citizenship Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Nagrita number halnu hola.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
