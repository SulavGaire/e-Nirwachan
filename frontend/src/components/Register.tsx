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
})

export function Register({ onCapturedRegister }) {
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
        console.log(values);
        onCapturedRegister(values);
    }

    return (
        <div className="flex flex-col justify-center items-center px-3">

            <div className="flex flex-col justify-center items-center ">
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
                        <div className="flex flex-col md:flex-row md:min-w-full gap-4">
                            <FormField
                                control={form.control}
                                name="FirstName"
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
                                name="MiddleName"
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
                                name="LastName"
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

                        <div>
                            <Button type="submit" className="m-8">Submit</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
