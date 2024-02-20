import React from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

const layout = () => {
    return (
        <>
            <div className='h-full relative'>
                <div className='hidden h-full md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 z-50 bg-gray-900'>
                    {/* <WebcamCapture /> */}
                    <Sidebar />
                </div>
                <main className='md:pl-60'>
                    <Navbar />
                </main>
                <div className='md:pl-60'>
                    <Outlet />
                </div>
            </div>

        </>
    )
}

export default layout