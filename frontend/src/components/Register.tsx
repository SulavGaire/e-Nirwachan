import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools"
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
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import WebcamCapture from "./WebcamComponent"


const formSchema = z.object({
    FirstName: z.string().min(2, {
        message: "FirstName must be at least 2 characters.",
    }),
    MiddleName: z.string(),
    LastName: z.string().min(2, {
        message: "LastName must be at least 2 characters.",
    }),
    CitizenshipNumber: z.string().min(10, {
        message: "CitizenshipNumber must be at least 10 characters.",
    }),
    image: z.string()
})

export function Register() {
    const [progress, setProgress] = useState(1)
    const [image, setImage] = useState("" as string)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            FirstName: "",
            MiddleName: "",
            LastName: "",
            CitizenshipNumber: "",
            image: "",
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        setProgress(33);
        console.log(values);
    }

    const handleCapturedImage = (data: string) => {
        console.log('Received data from child:', data);
        setImage(data);
        form.setValue('image', data, { shouldDirty: true, shouldTouch: true, shouldValidate: true })
    };

    return (
        <div className="flex flex-col justify-center items-center px-3">
            <div className="flex flex-row justify-center">
                <h1 className="font-semibold font-sans text-center text-2xl mb-3">
                    Welcome To Voter Pre-Registration
                </h1>
            </div>
            <div className="flex flex-col justify-center items-center ">
                <Form {...form} >
                    {/* <p>Progress Bar</p> */}
                    <Progress className="mb-3" value={progress} />
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
                        <div className="flex flex-col md:flex-row md:min-w-full gap-4">
                            <FormField
                                control={form.control}
                                name="FirstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>FirstName</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Suresh" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="MiddleName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>MiddleName</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Thapa" {...field} />
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
                        </div>
                        <FormField
                            control={form.control}
                            name="CitizenshipNumber"
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

                        <img src={image} alt="image" {...form.register("image")} />
                        <Dialog>
                            <DialogTrigger>
                                <Button variant="outline" className='m-8'>
                                    Open Camera
                                </Button>
                            </DialogTrigger>
                        </Dialog>

                        <Button type="submit" className="m-8">Submit</Button>
                    </form>
                    <DevTool control={form.control} />
                </Form>
                <Dialog>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Capture image</DialogTitle>

                            <DialogDescription>
                            </DialogDescription>

                        </DialogHeader>
                        <WebcamCapture onCapturedImage={handleCapturedImage} />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
