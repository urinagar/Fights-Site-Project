import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import { Unsubscribe } from "redux";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore, vacationsStore } from "../../../Redux/Store";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import Home from "../../HomeArea/Home/Home";
import AddVacation from "../../VacationArea/AddVacation/AddVacation";
import BarChart from "../../VacationArea/BarChart/BarChart";
import DeleteVacation from "../../VacationArea/DeleteVacation/DeleteVacation";
import UpdateVacation from "../../VacationArea/UpdateVacation/UpdateVacation";

function Router(): JSX.Element {
    const [user, setUser] = useState<UserModel>(authStore.getState().user);
    
    const unsubscribeMe: Unsubscribe = authStore.subscribe(() => {
        setUser(authStore.getState().user);
    });

    const [vacations, setVacations] = useState<VacationModel[]>(vacationsStore.getState().vacations);
    
    const unsubscribeMeVacations: Unsubscribe = vacationsStore.subscribe(() => {
        setVacations(vacationsStore.getState().vacations);
    });

    useEffect( () => {
        return () => {
            setUser(undefined);
            unsubscribeMe();
            unsubscribeMeVacations();
        }
    }, []);

    return (
			<Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />

                {user && <Route path="/vacations-graph" element = {user.role === "Admin"? <BarChart vacations={vacations} /> : <Navigate to="/home" /> } />}
                {user && <Route path="/add-vacation" element = {user.role === "Admin"? <AddVacation /> : <Navigate to="/home" /> } />}
                {user && <Route path="/edit-vacation" element = {user.role === "Admin"? <UpdateVacation /> : <Navigate to="/home" /> } />}
                {user && <Route path="/delete-vacation/:vacationId" element = {user.role === "Admin"? <DeleteVacation /> : <Navigate to="/home" /> } />}
                
                <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />}  />
                <Route path="*" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />

            </Routes>
    );
}

export default Router;
