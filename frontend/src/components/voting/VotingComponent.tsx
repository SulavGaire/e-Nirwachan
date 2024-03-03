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
import axiosInstance from '@/lib/axiosInstance';
import React, { useState } from "react"
import { candidateIMG } from "@/lib/candidateIMG";


const VotingComponent = ({ onCapturedVotingData, backendData }) => {

    // const options = [
    //     { value: 'Aakhil', avatar: 'https://th.bing.com/th/id/OIP.PPJ5FAl38tVVP-qGavD8tQHaE4?rs=1&pid=ImgDetMain', alt: 'Aakhil' },
    //     { value: 'Nebi', avatar: 'https://th.bing.com/th/id/OIP.tAXbbQpns_qJ1bk_ZMy-9QAAAA?rs=1&pid=ImgDetMain', alt: 'Nebi' },
    //     { value: 'Krantikari', avatar: 'https://th.bing.com/th/id/OIP.DauOLnEL1Lp9zx8pmUNQkwHaE0?rs=1&pid=ImgDetMain', alt: 'Krantikari' }
    // ];
    const { toast } = useToast()


    console.log("backend", backendData);
    const registeredImages = candidateIMG.filter((candidate) => {
        return backendData.some((data) => data.Image === candidate.id.toString());
    });

    function searchByImage(imageValue) {
        return backendData.filter(user => user.Image === imageValue);
    }

    const FormSchema = z.object({
        type: z.string(),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log("Submitted data", data);
        const Party = searchByImage(data.type)[0].Party;
        const Candidatecitizennum = searchByImage(data.type)[0].Citizenshipnum;
        const Candidatename = searchByImage(data.type)[0].Firstname;
        if (Party && Candidatecitizennum && Candidatename) {
            // console.log("Voting Success", { party, Candidatecitizennum });
            onCapturedVotingData({ Party, Candidatecitizennum, Candidatename });
            toast({
                title: "Voting Success",
                description: <>You voted to{" "} <span style={{ color: 'red', fontWeight: 'bold' }}>{searchByImage(data.type)[0].Firstname}</span>. Thanks for your participation!</>,
            });
        } else {
            toast({
                title: "Error",
                description: "Error in Voting",
            });
        }

    }
    return (
        <div className="flex flex-col justify-center items-center px-3">
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
                                        {registeredImages.map((option) => (
                                            <FormItem
                                                key={option.id}
                                                className="flex items-center space-x-3 space-y-0"
                                            >
                                                <FormControl>
                                                    <RadioGroupItem value={option.id.toString()} />
                                                </FormControl>
                                                <Avatar>
                                                    <AvatarImage src={option.img} alt={option.id} />
                                                    <AvatarFallback>{option.id}</AvatarFallback>
                                                </Avatar>
                                                <FormLabel className="flex flex-row">

                                                    {searchByImage(option.id.toString())[0].Firstname}
                                                    {searchByImage(option.id.toString())[0].Middlename}
                                                    {searchByImage(option.id.toString())[0].Lastname}

                                                </FormLabel>
                                                <FormLabel className="flex flex-row font-semibold">
                                                    (
                                                    {searchByImage(option.id.toString())[0].Party}
                                                    )
                                                </FormLabel>
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
    )
}

export default VotingComponent