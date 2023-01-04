import { useEffect, useState } from "react";
import { API_URL } from "./api/config";
import SignUpForm from "./component/SignUpForm";
import './Login.css'

export default function Login(){
    const [users, setUsers] = useState([]);
    const [login, setLogin] = useState(true)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const getUsers = async () => {
        const response = await fetch(`${API_URL}/users`, { method: 'GET' });
        const data = await response.json();
        setUsers(data);
    };
    const closeLoginHandler = ()=>{
        setLogin(false)
    }
    useEffect(()=>{
        getUsers();
    },[])
    return(
        <div className="container">
            {login ? (
            <div className="form-container">
                <form>
                    <h3>Login</h3>
                    <section className="username-container">
                        <input
                            type="text"
                            required
                            id="username"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e)=>{setUsername(e.target.value)}}
                        />
                    </section>
                    <section className="password-container">
                        <input
                            type="password"
                            required
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                        />
                    </section>
                    <button className="submit-handler" type="submit">Login</button>
                </form>
                <p>Don't have an account? <button className="login-handler" onClick={closeLoginHandler}>Sign-Up</button></p>
            </div>
            ) : (
                <SignUpForm 
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