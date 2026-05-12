import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

function Header() {

    const LoggedIn = useContext(UserContext)
    const navigate = useNavigate()

    function logOut ()
    {
        localStorage.removeItem("nutrify-user");
        LoggedIn.setuserLogged(null);
        navigate("/login");
    }

    return (
        <header className="header">
            <div className="logo">
                <h1>My Header</h1>
            </div>
            <nav className="nav-bar">
                <ul>
                    <li><Link className='link' to="/">Home</Link></li>
                    <li><Link className='link' to="/about">About</Link></li>
                    <li>Contacts</li>
                    <li>Services</li>
                </ul>
            </nav>
            <button className='btn' onClick={logOut}>Logout</button>
        </header>
    )
}

export default Header