import { AuthState } from './../Redux/AuthState';
import { vacationsStore } from './../Redux/Store';
import { addVacationAction, deleteVacationAction, fetchVacationsAction, updateVacationAction } from './../Redux/VacationsState';
import VacationModel from "../Models/VacationModel";
import config from '../Utils/config';
import axios from 'axios';

class VacationsService {
    public async getAllVacations(): Promise<VacationModel[]>{

        if(vacationsStore.getState().vacations.length === 0) {
            const loggedUser = new AuthState()            
            const response = await axios.get<VacationModel[]>(config.urls.vacationsByUser + loggedUser.user.id);
            const vacations = response.data;   
            vacationsStore.dispatch(fetchVacationsAction(vacations));
            return vacations;
        }

        return vacationsStore.getState().vacations;
    }

    public async getOneVacation(vacationId: number): Promise<VacationModel> {
        const vacations = vacationsStore.getState().vacations;
        const vacation = vacations.find(v => v.vacationId === vacationId);
        if(vacation)  return vacation;

        const response = await axios.get<VacationModel>(config.urls.vacations + vacationId);
        return response.data;
    }

    public async addVacation(vacation: VacationModel): Promise<VacationModel> {
        const myFormData = new FormData();
        myFormData.append("description", vacation.description);
        myFormData.append("destination", vacation.destination);
        myFormData.append("startingDate", vacation.startingDate.toString());
        myFormData.append("endingDate", vacation.endingDate.toString());
        myFormData.append("price", vacation.price.toString());
        myFormData.append("image", vacation.image.item(0));        
        const response = await axios.post<VacationModel>(config.urls.vacations, myFormData);
        const addedVacation = response.data;
        vacationsStore.dispatch(addVacationAction(addedVacation));
        return addedVacation;
    }

    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
        const myFormData = new FormData();
        myFormData.append("description", vacation.description);
        myFormData.append("destination", vacation.destination);
        myFormData.append("startingDate", vacation.startingDate);
        myFormData.append("endingDate", vacation.endingDate);
        myFormData.append("price", vacation.price.toString());
        myFormData.append("followersCount", vacation.followersCount.toString());
        myFormData.append("image", vacation.image.item(0));
        const response = await axios.put<VacationModel>(config.urls.vacations + vacation.vacationId, myFormData);
        const updatedVacation = response.data;
        vacationsStore.dispatch(updateVacationAction(updatedVacation));
        return updatedVacation;
    }

    public async deleteVacation(vacationId: number): Promise<void> {
        await axios.delete<VacationModel>(config.urls.vacations + vacationId);
        vacationsStore.dispatch(deleteVacationAction(vacationId));

    }

    public async addFollower(vacationId: number, userId: number): Promise<boolean> {
        const response = await axios.post<boolean>(config.urls.follow + vacationId.toString() + "/" + userId.toString());        
        return response.data;
    }

    public async isFollowing(vacationId: number, userId: number): Promise<boolean>{
        const response = await axios.get<boolean>(config.urls.follow + vacationId.toString() + "/" + userId.toString());
        return response.data;
    }

}
const vacationsService = new VacationsService();
export default vacationsService;

