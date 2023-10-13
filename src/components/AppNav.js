import { Link } from "react-router-dom"
import '../components/AppNav.css'

const AppNav = () => {
    return (
        <nav className="mainNav">
            <ul>
                <li>
                    <Link to={"/"}>Login</Link>
                    <Link to={"/add-client"}>Dodaj klienta</Link>
                    <Link to={"/add-action"}>Dodaj akcję CRM</Link>
                </li>
            </ul>
        </nav>
    )
};

export default AppNav;