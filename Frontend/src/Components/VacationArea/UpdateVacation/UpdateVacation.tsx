import { Button, ButtonGroup } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import config from "../../../Utils/config";
import "./UpdateVacation.css";


function  UpdateVacation(): JSX.Element {
    const navigate = useNavigate();
    const [vacation, setVacation] = useState<VacationModel>(JSON.parse(localStorage.getItem("vacation")));
    
    const {register, handleSubmit, formState} = useForm<VacationModel>({
        defaultValues: {
            vacationId: vacation?.vacationId,
            description: vacation?.description,
            destination: vacation?.destination,
            startingDate: new Date(vacation.startingDate).toISOString().substring(0,16),
            endingDate: new Date(vacation.endingDate).toISOString().substring(0,16),
            price: vacation?.price,
        }
    });    
    function handleClick(): void {
        navigate("/home");
    }

    async function submit(updatedVacation: VacationModel): Promise<void>{
        updatedVacation.startingDate += ":00.000Z";
        updatedVacation.endingDate += ":00.000Z";
        updatedVacation.followersCount = vacation.followersCount
        await vacationsService.updateVacation(updatedVacation);
        navigate("/home");
    }
    return (
        <div className="UpdateVacation" >

            <form autoComplete="off" onSubmit={handleSubmit(submit)} style={{background: `rgba(0, 0, 0, 0.515) url(${config.urls.vacationsImages + vacation.imageName})`}}>
                
                <h2>Edit Vacation</h2>

                <button onClick={handleClick} className="BackBtn"><i className="fa fa-arrow-right " aria-hidden="true"></i></button>

                <div>
                    <label>Description</label>
                    <br />
                    <textarea style={formState.errors.description?.message && {border: " 1px solid red"}} {...register("description", {
                        validate: {value: description => description.trim().length !== 0 || "Please enter description"},
                        required: {value: true, message:"Please enter description"},
                        minLength: {value: 40, message:"Description most be at list 40 letters"},
                        maxLength: {value: 500, message:"Description most be at most 500 letters"},
                    })} />
                    <span>{formState.errors.description?.message}</span>
                </div>
                
                <div>
                    <label>Destination</label>
                    <br />
                    <input type="text" style={formState.errors.destination?.message && {border: " 1px solid red"}} placeholder="City, Country" {...register("destination", {
                        validate: {value: destination => destination.trim().length !== 0 || "Please enter destination"},
                        required: {value: true, message:"Please enter destination"},
                        pattern: {value:/.*, .*$/, message: "Please use correct pattern (City, Country)"},
                        minLength: {value: 10, message:"destination most be at list 10 letters"},
                        maxLength: {value: 50, message:"destination most be at most 50 letters"},
                    })} />
                    <span>{formState.errors.destination?.message}</span>
                </div>
                              
                <div>
                    <label>Price</label>
                    <br />
                    <input type="number" style={formState.errors.price?.message && {border: " 1px solid red"}}  {...register("price", {
                        required: {value: true, message:"Please enter price"},
                        min: {value: 1, message: " Price most be greater then zero"},
                        max: {value: 20000, message: " Price cant exceed 20000"},
                        minLength: {value: 10, message:"destination most be at list 10 letters"},
                        maxLength: {value: 50, message:"destination most be at most 50 letters"},
                        valueAsNumber: true,
                    })} />
                    <span>{formState.errors.price?.message}</span>
                </div>

                <div>
                    <label>Starting Date</label>
                    <br />
                    <input type="datetime-local" style={formState.errors.startingDate?.message && {border: " 1px solid red"}} {...register("startingDate", {
                        required: {value: true, message:"Please enter starting date"}
                    })} />
                    <span>{formState.errors.startingDate?.message}</span>
                </div>

                <div>
                    <label>Ending Date</label>
                    <br />
                    <input type="datetime-local" style={formState.errors.endingDate?.message && {border: " 1px solid red"}} {...register("endingDate", {
                        required: {value: true, message:"Please enter ending date"}
                    })} />
                    <span>{formState.errors.endingDate?.message}</span>
                </div>

                <div>
                    <label>Image</label>
                    <br />
                    <input type="file" accept="image/*" {...register("image")} />
                </div>

                <ButtonGroup className="BtnGroup">
                        <Button variant="contained" className="ResetBtn"  type="reset">Clear</Button>
                        <Button variant="contained" color="primary" type="submit"> Submit</Button>
                </ButtonGroup>
            </form>          
        </div>
    );
}

export default UpdateVacation;
