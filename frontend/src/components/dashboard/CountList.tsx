interface CountListProps {
    total_voters: number;
    today_votes: number;
    total_candidate: number;
}

const CountList: React.FC<CountListProps> = ({ total_voters, today_votes, total_candidate }) => {

    return (
        <div className='space-y-5'>
            <div className='border-[1px] rounded-lg bg-slate-700 w-40 h-28 p-3 flex flex-col justify-center items-center'>
                <p className='text-base font-semibold text-white font-sans'>TOTAL VOTERS</p>
                <p className='text-5xl font-bold  text-white '> {total_voters}</p>
            </div>
            <div className='border-[1px] rounded-lg bg-slate-700 w-40 h-28 p-3 flex flex-col justify-center items-center'>
                <p className='text-sm font-semibold text-white font-sans'>TODAY VOTES</p>
                <p className='text-5xl font-bold  text-white '> {today_votes}</p>
            </div>
            <div className='border-[1px] rounded-lg bg-slate-700 w-40 h-28 p-3 flex flex-col justify-center items-center'>
                <p className='text-sm font-semibold text-white font-sans'>TOTAL CANDIDATE</p>
                <p className='text-5xl font-bold text-white '> {total_candidate}</p>
            </div>
        </div>
    )
}

export default CountList