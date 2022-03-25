import { useLocation, useNavigate } from "react-router-dom";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Router from "../Router/Router";
import "./Layout.css";

function Layout(): JSX.Element {
    const location = useLocation();
    const navigate = useNavigate();
    
    function handleClick(): void {
        navigate("/home");
    }
    
    return (
        <div className="Layout">
            
               {location.pathname === "/login" || location.pathname === "/register"  || <header><Header /> </header> } 
            
            <main>
                <AuthMenu />
                <Router />
                {location.pathname === "/login" || location.pathname === "/register"  || <Footer /> } 
                {location.pathname === "/vacations-graph" && <button onClick={handleClick} className="BackBtn"><i className="fa fa-arrow-right " aria-hidden="true"></i></button>}
            </main>
        </div>
    );
}

export default Layout;
