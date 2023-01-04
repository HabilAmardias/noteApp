import { useEffect, useState } from "react";
import { API_URL } from "./api/config";

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
    const createUser = async () => {
        const requestOption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: username, pass: password })
        };
        const response = await fetch(`${API_URL}/users`, requestOption);
        const data = await response.json();
        setUsers([...users, data]);
    };
    const openLoginHandler = ()=>{
        setLogin(true)
    }
    const closeLoginHandler = ()=>{
        setLogin(false)
    }
    useEffect(()=>{
        getUsers();
    },[])
    return(
        <div>
            {login ? (
            <>
                <form className="form-login">
                    <h3>Login</h3>
                    <section className="username-container">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            required
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e)=>{setUsername(e.target.value)}}
                        />
                    </section>
                    <section className="password-container">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            required
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                        />
                    </section>
                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account? <button onClick={closeLoginHandler}>Sign-Up</button></p>
            </>
            ) : (
                <>
                    <form className="form-signup" onSubmit={(e)=>{
                        e.preventDefault();
                        createUser();
                        openLoginHandler();
                        }} method='POST'>
                        <h3>Sign-Up</h3>
                        <section className="username-container">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                required
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e)=>{setUsername(e.target.value)}}
                            />
                        </section>
                        <section className="password-container">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                required
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e)=>{setPassword(e.target.value)}}
                            />
                        </section>
                        <button type="submit">Sign-Up</button>
                    </form>
                    <p>Already have an account? <button onClick={openLoginHandler}>Log in</button></p>
                </>
            )}
        </div>
    )
}