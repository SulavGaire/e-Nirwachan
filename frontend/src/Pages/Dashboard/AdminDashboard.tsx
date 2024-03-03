import Title from '@/components/dashboard/Title'
import ChartComponent from '@/components/dashboard/ChartComponent'
import CandidateList from '@/components/dashboard/CandidateList';
import CountList from '@/components/dashboard/CountList';
import axiosInstance from '@/lib/axiosInstance';
import { useEffect, useState } from 'react';

const AdminDashboard = () => {
    const [candidatesData, setCandidatesData] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [votes, setVotes] = useState([]);
    const [totalVoters, setTotalVoters] = useState(0);
    const [todayVotes, setTodayVotes] = useState(0);
    const [totalCandidate, setTotalCandidate] = useState(0);
    // Get data for dashboard

    useEffect(() => {
        axiosInstance.get('/votecount/')
            .then(response => {
                // console.log("VoteCount", response.data)
                // console.log(response.data.totalvoters)
                // console.log(response.data.todayvotes)
                // console.log(response.data.partyvotes)
                // console.log(response.data.totalcandidates)

                setTotalVoters(response.data.totalvoters)
                setTodayVotes(response.data.todayvotes)
                setCandidates(response.data.partyvotes)
                setTotalCandidate(response.data.totalcandidates)
                console.log("candidates", candidates);

            })
            .catch(error => {
                console.log(error)
            })
        axiosInstance.get('/cinfo/')
            .then(response => {
                // console.log("cinfo", response.data)
                setCandidatesData(response.data);
                console.log("candidateData", candidatesData)

            })
            .catch(error => {
                console.log(error)
            })
    }, [])
    return (
        <div>
            <Title />
            <div className=' flex flex-row'>
                <div className='w-screen h-360 p-10'>
                    <ChartComponent data={candidates} />
                </div>
                <div className='p-5 mt-7'>
                    <CountList total_voters={totalVoters} today_votes={todayVotes} total_candidate={totalCandidate} />
                </div>
            </div>
            <div className='justify-center w-full p-8'>
                <CandidateList candidates={candidatesData} />
            </div>
        </div>
    )
}

export default AdminDashboard