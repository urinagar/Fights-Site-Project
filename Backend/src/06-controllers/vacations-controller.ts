import express, { NextFunction, Request, Response } from "express";
import verifyAdmin from "../02-middleware/verify-admin";
import verifyToken from "../02-middleware/verify-token";
import VacationModel from "../03-models/vacation-model";
import vacationLogic from "../05-bll/vacation-logic";
import path from "path";



const router = express.Router();

router.get("/vacations-by-user/:userId",verifyToken,  async (request: Request, response: Response, next: NextFunction) => { 
    try{
        const userId = +request.params.userId;
        const vacations = await vacationLogic.getAllVacations(userId);        
        response.json(vacations);
    }
    catch(err: any){
        next(err);
    }
});

router.get("/vacations/:id",verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try{
        const id = +request.params.id;
        const vacation = await vacationLogic.getOneVacation(id);
        
        response.json(vacation); 
    }
    catch(err: any){
        next(err);
    }
});

router.get("/vacations/images/:imagename", async (request: Request, response: Response, next: NextFunction) => {
    try{
        const imageName = request.params.imagename;        
        response.download(path.join(__dirname,"../assets/images/"+ imageName));
    }
    catch(err: any ){
        next(err);
    }
});

router.get("/vacations/follow/:vacationId/:userId",verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try{
        const vacationId = +request.params.vacationId;
        const userId =  +request.params.userId;
        const isFollowing = await vacationLogic.isFollowing(vacationId, userId);
        response.json(isFollowing);
    }
    catch(err: any){
        next(err);
    }
});

router.post("/vacations",verifyAdmin,  async (request: Request, response: Response, next: NextFunction) =>{
    try{
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);  
        const addedVacation = await vacationLogic.addVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch(err: any){
        next(err);
    }
});

router.post("/vacations/follow/:vacationId/:userId",verifyToken,  async (request: Request, response: Response, next: NextFunction) => {
    try{
        const id = +request.params.vacationId;
        const userId =  +request.params.userId;
        
        const vacation = new VacationModel(await vacationLogic.getOneVacation(id));
        
        const isFollowing = await vacationLogic.addFollower(vacation, userId);        
        response.json(isFollowing);
    }
    catch(err: any){
        next(err);
    }
});

router.put("/vacations/:id",verifyAdmin,  async (request: Request, response: Response, next: NextFunction) => {
    try{
        const id = +request.params.id;
        request.body.vacationId = id;
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        
        const updatedVacation = await vacationLogic.updateFullVacation(vacation);
        response.json(updatedVacation);
    }
    catch(err: any){
        next(err);
    }
});

router.delete("/vacations/:id",verifyAdmin,  async (request: Request, response: Response, next: NextFunction) => {
    try{
        const vacationId = +request.params.id;
        await vacationLogic.deleteVacation(vacationId);
        response.sendStatus(204);
    }
    catch(err: any){
        next(err);
    }
});




export default router;