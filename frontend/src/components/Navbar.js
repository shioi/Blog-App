import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const isActiveTab = (path) => {
        return location.pathname === path ? 'active' : '';
    };


    const handleClick = () => {
        console.log("Logging out");
        logout();
        navigate('/login')
        
    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-dark fixed-top" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link to="/">
                        <p className="navbar-brand" target="/">
                            <img src="/images/logo.png" height="50" width="80" alt="Logo" loading="lazy" />
                        </p>
                    </Link>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="bi bi-list"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
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
                                <li className="nav-item dropdown d-flex align-items-center">
                                    <p className="nav-link dropdown-toggle text-white" href="#" role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        style={{ paddingRight: '90px' }}
                                    >
                                        {user.username}
                                    </p>
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
