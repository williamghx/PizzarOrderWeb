import { Navigate } from "react-router";
import { useDataContext } from "../Contexts/DataContext";

const RequireAuth = (props) => {
    const {user} = useDataContext();

    if(!user){
        return <Navigate to="/login" />
    }

    return props.children;
};

export default RequireAuth;