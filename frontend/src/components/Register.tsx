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
    Date_of_birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Date_of_Birth must be in the format YYYY-MM-DD",
    }),
    Gender: z.enum(["Male", "Female", "Other"]),
})

export function Register({ onCapturedRegister }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Firstname: "",
            Middlename: "",
            Lastname: "",
            Citizenshipnum: "",
            Address: "",
            Date_of_birth: "",
            Gender: "Male",
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
                            name="Date_of_birth"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date of Birth</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter valid Date of Birth
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


                        <div>
                            <Button type="submit" className="mt-5">Submit</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
