import React from 'react'
import { Camera, LayoutDashboard, NotebookPen, Settings, Vote, VoteIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils'
import { Toaster } from "@/components/ui/toaster"
import { useAuth } from '@/contexts/AuthContext';

const AfterAuthRoutes = [
    {
        label: "Dashboard",
        icons: LayoutDashboard,
        href: '/',
        color: "text-sky-500"
    },
    {
        label: "Register",
        icons: NotebookPen,
        href: '/Register',
        color: "text-yellow-500"
    },
    {
        label: "Voting",
        icons: Vote,
        href: '/Voting',
        color: "text-red-500"
    },
    {
        label: "Setting",
        icons: Settings,
        href: '/*',
        color: "text-emerald-500"
    },
]

const BeforeAuthRoutes = [
    {
        label: "Dashboard",
        icons: LayoutDashboard,
        href: '/',
        color: "text-sky-500"
    },
    // {
    //     label: "Register",
    //     icons: NotebookPen,
    //     href: '/Register',
    //     color: "text-yellow-500"
    // },
    {
        label: "Voting",
        icons: Vote,
        href: '/Voting',
        color: "text-red-500"
    },
    {
        label: "Setting",
        icons: Settings,
        href: '/*',
        color: "text-emerald-500"
    },
]

const Sidebar = () => {
    let routes;
    const { isAuthenticated } = useAuth();
    isAuthenticated ? routes = AfterAuthRoutes : routes = BeforeAuthRoutes
    const location = useLocation();
    console.log(location.pathname);
    return (
        <div className='space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white'>
            <div className='px-3 py-2 flex-1'>
                <Link to="/" className='flex items-center pl-3 mb-14'>
                    <div className='relative w-8 h-8 mr-4'>
                        <img
                            src="/Logo.png"
                            alt="avatar"
                            className='w-full h-full'
                        />
                    </div>
                    <h1 className='text-2xl font-bold'>E - निर्वाचन</h1>
                </Link>
                <div className='space-y-1'>
                    {routes.map((route) => (
                        <Link
                            to={route.href}
                            key={route.label}
                            className={cn('text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 ease-in-out', location.pathname === route.href ? "text-white bg-white/10" : "text-zinc-400")}
                        >
                            <div className='flex items-center flex-1'>
                                <route.icons className={cn('h-5 w-5 mr-3 ', route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Sidebar