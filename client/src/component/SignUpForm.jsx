import { API_URL } from "../api/config";
export default function SignUpForm({ username, password, onUsersChange, onLoginChange, onUsernameChange, onPasswordChange}){
    const createUser = async () => {
        const requestOption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: username, pass: password })
        };
        const response = await fetch(`${API_URL}/users`, requestOption);
        const data = await response.json();
        onUsersChange([...users, data]);
    };
    const openLoginHandler = ()=>{
        onLoginChange(true)
    }
    return(
        <div className="form-container">
            <form onSubmit={(e)=>{
                e.preventDefault();
                createUser();
                openLoginHandler();
                }} method='POST'>
                <h3>Sign-Up</h3>
                <section className="username-container">
                    <input
                        type="text"
                        required
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e)=>{onUsernameChange(e.target.value)}}
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
                        onChange={(e)=>{onPasswordChange(e.target.value)}}
                    />
                </section>
                <button className="submit-handler" type="submit">Sign-Up</button>
            </form>
            <p>Already have an account? <button className="login-handler" onClick={openLoginHandler}>Log in</button></p>
        </div>
    )
}