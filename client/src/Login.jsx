import { useEffect, useState } from "react";

export default function Login(){
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const getUsers = async () => {
        const response = await fetch(`${API_URL}/users`, { method: 'GET' });
        const data = await response.json()
        setUsers(data)
      };
    const newUser = async () => {
        const requestOption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: username, pass: password })
        };
        const response = await fetch(`${API_URL}/users`, requestOption);
        const data = await response.json();
        setUsers([...users, data]);
        };
    useEffect(()=>{
        getUsers()
    },[])
    return(
        <div>
            <h1>Test</h1>
        </div>
    )
}