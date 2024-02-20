import React from 'react'
import MobileSidebar from './MobileSidebar'
import { Shield } from 'lucide-react'

const Navbar = () => {
    return (
        <div className='flex item-center p-4'>
            <MobileSidebar />
            <div className='flex w-full justify-end p-5'>
                <Shield>Logo</Shield>
                <p className='font-medium text-base pl-1'>Admin</p>
            </div>
        </div>
    )
}

export default Navbar