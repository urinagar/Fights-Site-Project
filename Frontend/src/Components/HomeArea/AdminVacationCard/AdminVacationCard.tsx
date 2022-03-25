import {  useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import config from "../../../Utils/config";
import "./AdminVacationCard.css";

interface AdminVacationCardProps {
	vacation: VacationModel;
}

function AdminVacationCard(props: AdminVacationCardProps): JSX.Element {
    const navigate = useNavigate();
    
    const handleEdit = async () => {
        localStorage.setItem("vacation",JSON.stringify(props.vacation));
        navigate("/edit-vacation");
    };

    const handleDelete = () => {
        navigate("/delete-vacation/" + props.vacation.vacationId);
    };
    return (
        <div className="AdminVacationCard">
			<div className="VacationCard">
                <div className="Container">  
                    <div className="ProductDetails">

                        <h1>{props.vacation.destination}</h1>                
                        <p className="Information">{props.vacation.description}</p>        
                            
                        <div className="Control Edit"> 
                            <button className="Btn" onClick={handleEdit}>
                                <span />
                                <span className="Heart"><i className="fa fa-pencil" aria-hidden="true"></i></span>
                                <span className="Follow">Edit Vacation</span>
                            </button>         
                        </div>
                        <div className="Control Delete"> 
                            <button className="Btn" onClick={handleDelete}>
                                <span />
                                <span className="Heart"><i className="fa fa-trash" aria-hidden="true"></i></span>
                                <span className="Follow">Delete Vacation</span>
                            </button>         
                        </div>           
                    </div>
                    
                    <div className="ProductImage">
                    
                    <img src={config.urls.vacationsImages + props.vacation.imageName} alt="" />
                    
                    <div className="Info">
                        <h2>Information</h2>
                        <ul>
                            <li>Starting Date : {new Date(props.vacation.startingDate).toLocaleString()} </li>
                            <li>Ending Date :  {new Date(props.vacation.endingDate).toLocaleString()} </li>                 
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminVacationCard;
