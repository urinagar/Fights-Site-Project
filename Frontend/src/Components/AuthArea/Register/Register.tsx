import { Button, ButtonGroup } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyfService";
import "./Register.css";

function Register(): JSX.Element {
    const navigator = useNavigate()
    const {register, handleSubmit, formState} = useForm<UserModel>();

    async function submit(user: UserModel){
        try{
            await authService.register(user);
            notifyService.success("Registered Successfully");
            navigator("/home");
        }
        catch(err: any){
            notifyService.error(err);
        }
    }

    return (
        <div className="Register">
            <div>
                <header>
                    <h1>Let the journey begin</h1>
                </header>
                <form onSubmit={handleSubmit(submit)}>
                    <div className="inputContainer">
                        <label >First Name</label>
                        <input type="text" name="firstName" {...register("firstName", {
                        required: { value: true, message: "Missing first name" },
                        validate: {value: firstName => firstName.trim().length !== 0 || "Please enter username"},                            
                        minLength: { value: 3, message: "First name must be minimum 3 chars" },
                        maxLength: { value: 50, message: " First name can't exceed 50 chars" }
                        })}/>
                    <span>{formState.errors.firstName?.message}</span>

                    </div>
                    <div className="inputContainer">
                        <label >Last Name</label>
                        <input type="text" name="lastName" {...register("lastName", {
                        required: { value: true, message: "Missing last name" },
                        validate: {value: lastName => lastName.trim().length !== 0 || "Please enter username"},                            
                        minLength: { value: 3, message: "Last name must be minimum 3 chars" },
                        maxLength: { value: 50, message: " Last name can't exceed 50 chars" }
                        })}/>
                    <span>{formState.errors.lastName?.message}</span>

                    </div>
                    <div className="inputContainer">
                        <label >Username</label>
                        <input type="text" name="username" {...register("username", {
                        required: { value: true, message: "Missing username" },
                        validate: {value: username => username.trim().length !== 0 || "Please enter username"},                            
                        minLength: { value: 3, message: "Username must be minimum 3 chars" },
                        maxLength: { value: 50, message: " Username can't exceed 50 chars" }
                        })}/>
                    <span>{formState.errors.username?.message}</span>

                    </div>
                    <div className="inputContainer" >
                        <label >Password</label>
                        <input type="password" name="password" {...register("password", {
                        required: { value: true, message: "Missing passowrd" },
                        validate: {value: password => password.trim().length !== 0 || "Please enter username"},                            
                        minLength: { value: 3, message: "Password must be minimum 3 chars" },
                        maxLength: { value: 20, message: " Password can't exceed 20 chars" }
                        })}/>
                    <span>{formState.errors.password?.message}</span>

                    </div>
                    <ButtonGroup className="BtnGroup">
                        <Button variant="contained" color="warning" type="reset">Clear</Button>
                        <Button variant="contained" color="primary" type="submit">Register</Button>
                    </ButtonGroup>
                </form>
            </div>
        </div>
    );
}

export default Register;
