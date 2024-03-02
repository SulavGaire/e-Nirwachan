import React from 'react'
import { Table } from "@/components/ui/table"
import { Card } from '../ui/card';
import { Button } from '../ui/button';

interface UserData {
    id: number;
    name: string;
}

const CandidateList = () => {
    const [users, setUsers] = React.useState<UserData[]>([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
        { id: 3, name: 'Alice Smith' },
    ]);

    const handleDelete = (userId: number) => {
        setUsers(users.filter((user) => user.id !== userId));
    };
    return (
        <Card className='w-[1030px]'>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>
                                <Button onClick={() => handleDelete(user.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Card>
    )
}

export default CandidateList