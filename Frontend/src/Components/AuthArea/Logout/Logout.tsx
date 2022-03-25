import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyfService";

function Logout(): JSX.Element {
    const navigate = useNavigate();

    useEffect(() => {
        authService.logout();
        notifyService.success("Logout Successfully");       
        navigate("/login");
    }, []);

    return null;
}


export default Logout;
