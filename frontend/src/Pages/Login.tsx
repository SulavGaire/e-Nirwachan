
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useNavigate } from "react-router-dom"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'


const formSchema = z.object({
    UserName: z.string().min(2, { message: "Username must have atleast 2 charecter" }),
    PassWord: z.string().min(5, { message: "minimum of 5 character is required in password" }),
})


const Login = () => {
    const navigate = useNavigate()

    const { setIsAuthenticated } = useAuth();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            UserName: "",
            PassWord: ""
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Login Submitted", values);
        if (setIsAuthenticated) {
            setIsAuthenticated(true);
        }
        navigate("/");
    }

    return (
        <div className="flex flex-col justify-center items-center px-3 ">
            <h1 className="font-semibold font-sans text-center text-2xl mb-3">
                Login Page
            </h1>
            <div className="flex flex-col justify-center items-center border-[1px] p-5 rounded-md ">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
                        <FormField
                            control={form.control}
                            name="UserName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>UserName</FormLabel>
                                    <FormControl>
                                        <Input placeholder="UserName" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="PassWord"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder="PassWord@ 1" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" >Login</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Login