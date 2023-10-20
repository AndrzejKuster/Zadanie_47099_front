import { Link, useNavigate } from "react-router-dom"
import '../components/AppNav.css'

const AppNav = (props) => {

    const navigate = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();
        props.setUser(null);
        localStorage.setItem('user', null)
        navigate('/')
    }   

    return (
        <nav className="mainNav">
            <ul>
                <li>
                    {!props.user && <Link to={"/"}>Login</Link>}
                    {props.user && <Link to={"/clients"}>Klienci</Link>}
                    {/* {props.user && <Link to={"/add-action"}>Wyszukaj klienta</Link>} */}
                    {props.user && <Link to={"/"} onClick={handleLogout} >Logout</Link>}
                </li>
            </ul>
        </nav>
    )
};

export default AppNav;