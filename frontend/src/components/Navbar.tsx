import React from 'react'
import MobileSidebar from './MobileSidebar'
import { Shield } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const Navbar = () => {
    const { isAuthenticated } = useAuth();
    return (
        <div className='flex item-center p-4'>
            <MobileSidebar />
            {isAuthenticated && <div className='flex w-full justify-end p-5'>
                <Shield>Logo</Shield>
                <p className='font-medium text-base pl-1'>Admin</p>
            </div>}
        </div>
    )
}

export default Navbar