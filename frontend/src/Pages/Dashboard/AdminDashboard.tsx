import Title from '@/components/dashboard/Title'
import ChartComponent from '@/components/dashboard/ChartComponent'
import CandidateList from '@/components/dashboard/CandidateList';

const AdminDashboard = () => {
    const data = [
        { _id: 'Nebi', total_votes: 5 },
        { _id: 'Kranti', total_votes: 2 },
        { _id: 'aakhil', total_votes: 4 },
        { _id: 'suresh', total_votes: 10 },
    ];
    return (
        <div>
            <Title />

            <div className='w-screen/2 '>
                <ChartComponent data={data} />
            </div>
            <CandidateList />
        </div>
    )
}

export default AdminDashboard