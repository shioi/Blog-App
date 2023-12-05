import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        console.log("Logging out");
        logout();
        navigate('/login')
        
    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link to="/">
                        <p className="navbar-brand" target="/">
                            <img src="/images/image.webp" height="16" alt="" loading="lazy" />
                        </p>
                    </Link>

                    <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarExample01"
                        aria-controls="navbarExample01" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link to="/">
                                    <p className="nav-link active" aria-current="page">Home</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/post">
                                    <p className="nav-link active" aria-current="page">Post</p>
                                </Link>
                            </li>
                        </ul>
                        <ul>
                            {user &&
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {user.username}
                                    </a>
                                    <ul className="dropdown-menu">
                                        <Link to="/account">
                                            <li><a className="dropdown-item">Profile</a></li>
                                        </Link>
                                        <li className="dropdown-item"><a onClick={handleClick}>Logout</a></li>
                                    </ul>
                                </li>
                            }
                            {!user &&
                                <li className="nav-item">
                                    <Link to='/login'>
                                        <button className="btn btn-outline-light">Login</button>
                                    </Link>
                                </li>
                                }
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
