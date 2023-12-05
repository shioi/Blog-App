import { useState } from "react"
import { useLogin } from "../hooks/useLogin"


const Login = () => {
    //states for tracking
    const [username, setUsername] = useState('')  
    const [password, setPassword] = useState('')
    const {login ,isLoading, error} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(username, password)
    }

    return (
        <div>
        <div class="sidenav">
         <div class="login-main-text">
                    <h2>Application</h2>
                    <br/>
                    <h2>Login Page</h2>
            <p>Login or register from here to access.</p>
         </div>
      </div>
        <div className="main">
            <div className="col-md-6 col-sm-12">
                <div className="login-form">
                    <form onSubmit={handleSubmit}>
                         <div className="form-group">
                            <label>Email/Username: </label>
                            <input
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                            />
                        </div>
                        <div class="form-group">
                            <label>Password: </label>
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                            />
                        </div>
                    <button disabled={isLoading} className="btn btn-black">Login</button>
                    {error && <div>{error}</div>}
                 </form>
                </div>
                </div>
            </div>
    </div>
    )
}

export default Login