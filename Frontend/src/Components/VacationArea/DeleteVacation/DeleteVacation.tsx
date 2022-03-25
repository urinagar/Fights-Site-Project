import { useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import vacationsService from "../../../Services/VacationsService";

function DeleteVacation(): JSX.Element {
    const vacationId = +useParams().vacationId;
    const navigate = useNavigate();
    
    
    useEffect((async () => {
        await vacationsService.deleteVacation(vacationId);
        navigate("/home");
    })as any, []);


    return null;
        
}

export default DeleteVacation;
