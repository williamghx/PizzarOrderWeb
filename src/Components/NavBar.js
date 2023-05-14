import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDataContext } from "../Contexts/DataContext";

const NavBar = () => {

    const { user, logout } = useDataContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container-fluid">
            <ul className="navbar-nav m-auto">
                <li className="nav-item">
                    <Link className="nav-link text-uppercase ml-5 mr-5" to="/">Menu</Link>
                </li>
                <li>
                    <Link className="nav-link text-uppercase ml-5 mr-5" to="/Admin">Management Portal</Link>
                </li>
            </ul>
            </div>
            {
                user && (
                    <>
                        <span>{`[${user.role}] ${user.user}`}</span>
                        <button className="btn btn-success nav-btn" onClick={()=> handleLogout()}>Logout</button>
                    </>
                )
            }
        </nav>
    );
};

export default NavBar;