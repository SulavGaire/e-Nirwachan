import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const Setting = () => {
    const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated?.(false);
        navigate('/')

    }
    return (
        <div className='mx-5 space-y-5'>
            <div className='flex flex-row gap-x-3 items-center justify-start'>
                <Settings size={30} />
                <Label>Setting page</Label>
            </div>
            <Button onClick={logout}>Logout</Button>
        </div>
    )
}

export default Setting