import VacationModel from "../Models/VacationModel";

export class VacationsState {
    public vacations: VacationModel[] = [];
}

export enum VacationsActionType {
    FetchVacations = "FetchVacations",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation"
}

export interface VacationsAction {
    type: VacationsActionType; 
    payload: any; 
}

export function fetchVacationsAction(vacations: VacationModel[]): VacationsAction {
    return { type: VacationsActionType.FetchVacations, payload: vacations };
}
export function addVacationAction(vacationToAdd: VacationModel): VacationsAction {
    return { type: VacationsActionType.AddVacation, payload: vacationToAdd };
}
export function updateVacationAction(vacationToUpdate: VacationModel): VacationsAction {
    return { type: VacationsActionType.UpdateVacation, payload: vacationToUpdate };
}
export function deleteVacationAction(idToDelete: number): VacationsAction {
    return { type: VacationsActionType.DeleteVacation, payload: idToDelete };
}

export function vacationsReducer(currentVacationsState: VacationsState = new VacationsState(), action: VacationsAction): VacationsState {

    const newVacationsState = { ...currentVacationsState };

    switch (action.type) {

        case VacationsActionType.FetchVacations: 
            newVacationsState.vacations = action.payload;
            break;

        case VacationsActionType.AddVacation: 
            newVacationsState.vacations.push(action.payload);
            break;

        case VacationsActionType.UpdateVacation: 
            const indexToUpdate = newVacationsState.vacations.findIndex(p => p.vacationId === action.payload.vacationId);
            newVacationsState.vacations[indexToUpdate] = action.payload;
            break;

        case VacationsActionType.DeleteVacation: 
            const indexToDelete = newVacationsState.vacations.findIndex(p => p.vacationId === action.payload);
            newVacationsState.vacations.splice(indexToDelete, 1);
            break;
    }

    return newVacationsState;
}