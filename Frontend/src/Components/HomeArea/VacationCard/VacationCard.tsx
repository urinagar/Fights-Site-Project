import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import { AuthState } from "../../../Redux/AuthState";
import vacationsService from "../../../Services/VacationsService";
import config from "../../../Utils/config";
import "./VacationCard.css";

interface VacationCardProps {
	vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const loggedUser = new AuthState();
    const [wishlist, setWishlist] = useState<string>("");
    const [heart, setHeart] = useState<string>("");

    useEffect((async () => {
        
        
        const isFollowing = await vacationsService.isFollowing(props.vacation.vacationId,loggedUser.user.id);
        if(isFollowing) {
            setWishlist("Remove From Wishlist");
            setHeart("fa fa-heart");
        }
        else {
            setWishlist("Add To Wishlist");
            setHeart("fa fa-heart-o");
        }
    })as any,[props.vacation.followersCount]);
    
    const handleClick = async () => {
        await vacationsService.addFollower(props.vacation.vacationId,loggedUser.user.id);  
    };
    
    return (
    <div className="VacationCard">
        <div className="Container">  
            <div className="ProductDetails">

                <h1>{props.vacation.destination}</h1>                
                <p className="Information">{props.vacation.description}</p>        
                    
                <div className="Control"> 
                    <button className="Btn" onClick={handleClick}>
                        <span className="Price">${props.vacation.price}</span>
                        <span className="Heart">{props.vacation.followersCount + " "}<i className={heart} aria-hidden="true"></i></span>
                        <span className="Follow">{wishlist}</span>
                    </button>         
                </div>       
            </div>
            
            <div className="ProductImage">
            
            <img src={config.urls.vacationsImages + props.vacation.imageName} alt="" />
            
            <div className="Info">
                <h2>Information</h2>
                <ul>
                    <li>Starting Date : {new Date(props.vacation.startingDate).toLocaleString()} </li>
                    <li>Ending Date :  {new Date(props.vacation.endingDate).toLocaleString()} </li>                 
                </ul>
            </div>
            </div>
        </div>
    </div>
     );
}

export default VacationCard;






















{/* <div className="VacationCard">
        <div>
            <h3></h3>
            <br />
            Price: ${props.vacation.price}
            <br />
            Starting Date: {new Date(props.vacation.startingDate).toLocaleString()}
            <br />
            Ending Date: {new Date(props.vacation.endingDate).toLocaleString()}
            <br />
        </div>
        <div>
            <img src={config.urls.vacationsImages + props.vacation.imageName} />
        </div>
    </div> */}