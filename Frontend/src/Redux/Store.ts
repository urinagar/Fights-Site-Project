import { createStore } from "redux";
import { authReducer } from "./AuthState";
import { vacationsReducer } from "./VacationsState";

export const authStore = createStore(authReducer);
export const vacationsStore = createStore(vacationsReducer);