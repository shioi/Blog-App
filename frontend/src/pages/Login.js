import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useLogin();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await login(username, password);
        if (res) {
            window.location.reload();
        }
    };

    const handleRegister = () => {
        navigate('/signup')
    }

    return (
        <div id = "intro" className="container p-5">
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card shadow-lg" style={{ backgroundColor: '#fff' }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src="/images/2017-11-04-wizard.jpg" className="img-fluid h-100" alt="" />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body text-dark">
                                    <p className="card-text">Welcome to the land of magic</p>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="username" className="form-label">Email/Username:</label>
                                            <input
                                                type="text"
                                                id="username"
                                                className="form-control"
                                                onChange={(e) => setUsername(e.target.value)}
                                                value={username}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password:</label>
                                            <input
                                                type="password"
                                                id="password"
                                                className="form-control"
                                                onChange={(e) => setPassword(e.target.value)}
                                                value={password}
                                            />
                                        </div>
                                        <button disabled={isLoading} type="submit" className="btn btn-primary btn-block">Login</button>
                                        {error && <div className="text-danger mt-3">{error}</div>}
                                    </form>
                                    <div className="mt-3 text-center">
                                        <p>Don't have an account?</p>
                                        <button onClick={ handleRegister} className="btn btn-outline-secondary">Register</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
