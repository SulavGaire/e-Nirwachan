import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { DevTool } from "@hookform/devtools"


const FormSchema = z.object({
    type: z.enum(["aakhil", "nebi", "kranti"], {
        required_error: "You need to select a notification type.",
    }),
})

const VotingComponent = () => {

    const { toast } = useToast()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);
        toast({
            title: "Voting Success",
            description: <>You voted to <span style={{ color: 'red', fontWeight: 'bold' }}>{data.type}</span>. Thanks for your participation!</>,
        });
    }
    return (
        <div className="flex flex-col justify-center items-center px-3">
            <div className="flex flex-row justify-center">
                <h1 className="font-semibold font-sans text-center text-2xl mb-3">
                    Welcome To Voting Page
                </h1>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Candidate List</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="aakhil" />
                                            </FormControl>
                                            <Avatar>
                                                <AvatarImage src="https://th.bing.com/th/id/OIP.PPJ5FAl38tVVP-qGavD8tQHaE4?rs=1&pid=ImgDetMain" alt="Aaklil" />
                                                <AvatarFallback>Aaklil</AvatarFallback>
                                            </Avatar>
                                            <FormLabel className="font-normal">
                                                Aakhil
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="nebi" />
                                            </FormControl>
                                            <Avatar>
                                                <AvatarImage src="https://th.bing.com/th/id/OIP.tAXbbQpns_qJ1bk_ZMy-9QAAAA?rs=1&pid=ImgDetMain" alt="Nebi" />
                                                <AvatarFallback>nebi</AvatarFallback>
                                            </Avatar>
                                            <FormLabel className="font-normal">

                                                Nebi
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="kranti" />
                                            </FormControl>
                                            <Avatar>
                                                <AvatarImage src="https://th.bing.com/th/id/OIP.DauOLnEL1Lp9zx8pmUNQkwHaE0?rs=1&pid=ImgDetMain" alt="Kranti" />
                                                <AvatarFallback>Kranti</AvatarFallback>
                                            </Avatar>
                                            <FormLabel className="font-normal">
                                                Krantikari
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
                <DevTool control={form.control} />
            </Form>

        </div>
    )
}

export default VotingComponent