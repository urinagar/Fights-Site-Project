import "./Login.css";
import { Button, ButtonGroup } from "@mui/material";
import { useForm } from "react-hook-form";
import CredentialModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import { NavLink, useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyfService";

function Login(): JSX.Element {
    const navigator = useNavigate()
    const {register, handleSubmit,formState} = useForm<CredentialModel>();

    async function submit(credentials: CredentialModel){
        try{
            await authService.login(credentials);
            notifyService.success("Login Successfully");
            navigator("/home");
        }
        catch(err: any){
            notifyService.error(err);
        }
    }

    return (
        <div className="Login">
            <div>
                <header>
                    <h1>Let the journey begin</h1>
                </header>
                <form autoComplete="off" onSubmit={handleSubmit(submit)}>
                    <div className="inputContainer">
                        <label >Username</label>
                        <input autoComplete="nope" type="text" name="username" {...register("username",{
                            required: {value: true , message:"Please enter username"},
                            validate: {value: destination => destination.trim().length !== 0 || "Please enter username"},                            
                        })}/>
                        <span className="errorSpan">{formState.errors.username?.message}</span>
                    </div>
                    
                    <div className="inputContainer" >
                        <label >Password</label>
                        <input type="password" name="password"  {...register("password",{
                            required: {value: true , message:"Please enter password"},
                            validate: {value: destination => destination.trim().length !== 0 || "Please enter password"},
                        })}/>
                        <span className="errorSpan">{formState.errors.password?.message}</span>
                    </div>
                    <ButtonGroup className="BtnGroup">
                        <Button variant="contained" color="warning" type="reset">Clear</Button>
                        <Button variant="contained" color="primary" type="submit">Login</Button>
                    </ButtonGroup>
                </form>
                <br />
                <span>dont have an acount yet? <NavLink to="/register">register</NavLink> </span> 
            </div>
        </div>
    );
}

export default Login;
