import { useEffect, useState } from "react";
import { API_URL } from "./api/config";
import SignUpForm from "./component/SignUpForm";
import LoginForm from "./component/LoginForm";
import './Login.css'

export default function Login(){
    const [users, setUsers] = useState([]);
    const [login, setLogin] = useState(true)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const getUsers = async () => {
        const response = await fetch(`${API_URL}/users`, { method: 'GET', mode:'cors' });
        const data = await response.json();
        setUsers(data);
    };
    useEffect(()=>{
        getUsers();
    },[users]);
    return(
        <div className="container">
            {login ? (
            <LoginForm 
            users={users}
            username={username}
            password={password}
            onLoginChange={setLogin}
            onUsernameChange={setUsername}
            onPasswordChange={setPassword}
            />
            ) : (
                <SignUpForm
                users={users} 
                username={username} 
                password={password} 
                onUsersChange={setUsers} 
                onLoginChange={setLogin} 
                onUsernameChange={setUsername} 
                onPasswordChange={setPassword} 
                />
            )}
        </div>
    )
}