import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useDataContext } from "../Contexts/DataContext";

const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { login, loginError } = useDataContext();
    const navigate = useNavigate();

    const handleLogin = async() => {
        await login(userName, password);
        navigate("/Admin")
    };

    return (
        <div>
            <label htmlFor="username">
                User Name: <input id="username" type="text" onChange={e => setUserName(e.target.value)} />
            </label>   
            <label htmlFor="password">
                Password: <input id="password" type="text" onChange={e => setPassword(e.target.value)} />
            </label>
            <Button onClick={ handleLogin}>Login</Button>
            <label>{loginError}</label>
        </div>
    );
};

export default Login;