import { authStore } from './../Redux/Store';
import axios from "axios";
import UserModel from "../Models/UserModel";
import config from "../Utils/config";
import { loginAction, logoutAction, registerAction } from '../Redux/AuthState';
import CredentialsModel from '../Models/CredentialsModel';

class AuthService {
    public async register(user: UserModel): Promise<void> {
        const response = await axios.post<string>(config.urls.register, user);
        const token = response.data;
        authStore.dispatch(registerAction(token));
    }

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<string>(config.urls.login, credentials);
        const token = response.data;
        authStore.dispatch(loginAction(token));
    }

    public async logout(): Promise<void> {
        authStore.dispatch(logoutAction());
    }  
}

const authService = new AuthService();
export default authService; 
