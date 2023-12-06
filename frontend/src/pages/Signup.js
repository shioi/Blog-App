import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { useNavigate } from "react-router-dom";

const Signup = () => {
    //states for tracking
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')  
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await signup(email, username, password)
        if (response) {
            window.location.reload();
        }
    }
    const handleLogin = () => {
        navigate('/login')
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
                                    <p className="card-text">Register to the land of magic</p>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="username" className="form-label">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="form-control"
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                            />
                                        </div>
                                            <div className="mb-3">
                                            <label htmlFor="username" className="form-label">Username:</label>
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
                                        <button disabled={isLoading} type="submit" className="btn btn-primary btn-block">Register</button>
                                        {error && <div className="text-danger mt-3">{error}</div>}
                                    </form>
                                    <div className="mt-3 text-center">
                                        <p>Already have an account?</p>
                                        <button onClick={ handleLogin} className="btn btn-outline-secondary">Login</button>
                                    </div>
                                    <div>
                                        {error && <p>{error} </p>}
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

export default Signup