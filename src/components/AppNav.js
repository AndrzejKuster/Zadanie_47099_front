import { Link } from "react-router-dom"
import '../components/AppNav.css'

const AppNav = () => {
    return (
        <nav className="mainNav">
            <ul>
                <li>
                    <Link to={"/"}>Login</Link>
                    <Link to={"/clients"}>Klienci</Link>
                    <Link to={"/add-action"}>Wyszukaj klienta</Link>
                </li>
            </ul>
        </nav>
    )
};

export default AppNav;