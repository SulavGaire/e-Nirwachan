import React from 'react'

import { Button } from '../ui/button';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import axiosInstance from '@/lib/axiosInstance';

interface Candidate {
    Firstname: string;
    Middlename: string;
    Lastname: string;
    Citizenshipnum: string;
    Party: string;
    Image: string;
}
interface CandidateTableProps {
    candidates?: Array<Candidate>;
}

const CandidateList: React.FC<CandidateTableProps> = ({ candidates }) => {
    const handleDelete = (index: string) => {
        // Delete the candidate from the list or perform any other action
        console.log(`Deleting candidate at index ${index}`);
        const APIDATA = {
            "Citizenshipnum": index,
            "token": localStorage.getItem('token'),
        }
        console.log("apidata", APIDATA);
        axiosInstance.post('/delete/', APIDATA)
            .then(response => {
                console.log(response.data)
                window.location.reload();
            })
            .catch(error => {
                console.log(error)
            })
    };

    return (

        <table className="w-full border-collapse border border-gray-900">
            <thead>
                <tr className="bg-gray-800">
                    <th className="border border-gray-200 px-4 py-2 text-white ">Firstname</th>
                    <th className="border border-gray-200 px-4 py-2 text-white">Middlename</th>
                    <th className="border border-gray-200 px-4 py-2 text-white">Lastname</th>
                    <th className="border border-gray-200 px-4 py-2 text-white">Citizenship number</th>
                    <th className="border border-gray-200 px-4 py-2 text-white">Party</th>
                    <th className="border border-gray-200 px-4 py-2 text-white">Image</th>
                    <th className="border border-gray-200 px-4 py-2 text-white ">Actions</th>
                </tr>
            </thead>
            <tbody>
                {candidates.map((candidate, index) => (
                    <tr key={index} className="border border-gray-200">
                        <td className="border border-gray-200 px-4 py-2">{candidate.Firstname}</td>
                        <td className="border border-gray-200 px-4 py-2">{candidate.Middlename}</td>
                        <td className="border border-gray-200 px-4 py-2">{candidate.Lastname}</td>
                        <td className="border border-gray-200 px-4 py-2">{candidate.Citizenshipnum}</td>
                        <td className="border border-gray-200 px-4 py-2">{candidate.Party}</td>
                        <td className="border border-gray-200 px-4 py-2">
                            <Avatar>
                                <AvatarImage src={`/ElectionSymbol/${candidate.Image}.png`} alt={candidate.Image} />
                                <AvatarFallback>{candidate.Image}</AvatarFallback>
                            </Avatar>
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                            <Button variant={'destructive'} onClick={() => handleDelete(candidate.Citizenshipnum)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>


    )
}

export default CandidateList