import { Component } from "react";
import { Unsubscribe } from "redux";
import VacationModel from "../../../Models/VacationModel";
import { AuthState } from "../../../Redux/AuthState";
import { vacationsStore } from "../../../Redux/Store";
import notifyService from "../../../Services/NotifyfService";
import vacationsService from "../../../Services/VacationsService";
import AdminVacationCard from "../AdminVacationCard/AdminVacationCard";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";

interface VacationsListState {
	vacations: VacationModel[];
}

class VacationsList extends Component<{}, VacationsListState> {
    
    private unSubscribeMe: Unsubscribe;
    private loggedUser = new AuthState();

    public async componentDidMount() {
        try{
            
            const vacations = await vacationsService.getAllVacations();            
            this.setState({ vacations });

            this.unSubscribeMe = vacationsStore.subscribe(async () => {
                const vacations = await vacationsService.getAllVacations();
                this.setState({ vacations });
            })
        }
        catch(err: any){
            notifyService.error(err);
        }
    }

    public handleClick(){

    }
    componentWillUnmount(): void {
        this.unSubscribeMe();
    }
    
    public render(): JSX.Element {
        return (
            <div className="VacationsList">
				{this.state?.vacations?.map(v => <div key={v.vacationId}>{this.loggedUser.user.role === "Admin"?   <AdminVacationCard  key={v.vacationId} vacation={v} /> : <VacationCard key={v.vacationId} vacation={v} />}</div>).reverse()}
            </div>
        );
    }

}

export default VacationsList;
