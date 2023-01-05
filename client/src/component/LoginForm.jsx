import { useNavigate } from "react-router-dom";

export default function LoginForm ({users, username, password, onLoginChange, onUsernameChange, onPasswordChange}){
    const navigate = useNavigate();
    const loginHandler = ()=>{
        const searchUser = users.find(obj =>obj.user === username && obj.pass === password);
        if (!searchUser) {
            navigate('/error404');
        } else{
            navigate(`/notes/${searchUser._id}`);
        };
    };
    const closeLoginHandler = ()=>{
        onLoginChange(false);
    };
    return(
        <div className="form-container">
            <form onSubmit={(e)=>{
                e.preventDefault()
                loginHandler()
                }}>
                <h3 className="login-title">Login</h3>
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
                <button className="submit-handler" type="submit">Login</button>
            </form>
            <p className="account">Don't have an account? <button className="login-handler" onClick={closeLoginHandler}>Sign-Up</button></p>
        </div>
    )
}