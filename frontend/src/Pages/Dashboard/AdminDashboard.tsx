import Title from '@/components/dashboard/Title'
import ChartComponent from '@/components/dashboard/ChartComponent'
import CandidateList from '@/components/dashboard/CandidateList';
import CountList from '@/components/dashboard/CountList';

const AdminDashboard = () => {
    const data = [
        { _id: 'Nebi', total_votes: 50 },
        { _id: 'Kranti', total_votes: 70 },
        { _id: 'aakhil', total_votes: 40 },
        { _id: 'suresh', total_votes: 90 },
        { _id: 'paras', total_votes: 100 },
    ];
    return (
        <div>
            <Title />
            <div className=' flex flex-row'>
                <div className='w-screen h-360 p-10'>
                    <ChartComponent data={data} />
                </div>
                <div className='p-5 mt-7'>
                    <CountList />
                </div>
            </div>
            <div className='justify-center w-full p-8'>
                <CandidateList />
            </div>
        </div>
    )
}

export default AdminDashboard