import { useNavigate } from "react-router-dom";
import { AuthState } from "../../../Redux/AuthState";
import { vacationsStore } from "../../../Redux/Store";
import VacationsList from "../VacationsList/VacationsList";
import "./Home.css";

function Home(): JSX.Element {
    const loggedUser = new AuthState();
    const navigate = useNavigate();
    
    function handleClick(): void{
        navigate("/add-vacation");
    }
    function handleClickGraph(): void {
        localStorage.setItem("chartVacations", JSON.stringify(vacationsStore.getState().vacations)); 
        navigate("/vacations-graph");

    }
    return (
        <div className="Home">
            <hr />

            <main>
               
                {loggedUser.user.role === "Admin" && <span><a className="Graph" onClick={handleClickGraph}></a></span>}
                {loggedUser.user.role === "Admin" && <span><a onClick={handleClick}></a></span>}
   
                <VacationsList />
            </main>
        </div>
    );
}

export default Home;
