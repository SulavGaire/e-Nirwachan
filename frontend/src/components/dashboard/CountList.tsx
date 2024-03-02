import React from 'react'

const CountList = () => {
    return (
        <div className='space-y-5'>
            <div className='border-[1px] rounded-lg bg-slate-700 w-40 h-28 p-3 flex flex-col justify-center items-center'>
                <p className='text-base font-semibold text-white font-sans'>TOTAL VOTERS</p>
                <p className='text-5xl font-bold  text-white '> 12345</p>
            </div>
            <div className='border-[1px] rounded-lg bg-slate-700 w-40 h-28 p-3 flex flex-col justify-center items-center'>
                <p className='text-sm font-semibold text-white font-sans'>TOTAL CANDIDATES</p>
                <p className='text-5xl font-bold  text-white '> 12345</p>
            </div>
            <div className='border-[1px] rounded-lg bg-slate-700 w-40 h-28 p-3 flex flex-col justify-center items-center'>
                <p className='text-sm font-semibold text-white font-sans'>TOTAL CANDIDATES</p>
                <p className='text-5xl font-bold text-white '> 12345</p>
            </div>
        </div>
    )
}

export default CountList