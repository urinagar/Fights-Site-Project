import { OkPacket } from "mysql";
import ClientError from "../03-Models/client-error";
import VacationModel from "../03-models/vacation-model";
import dal from "../04-dal/dal";
import { v4 as uuid } from "uuid";
import config from "../01-utils/config";
import safeDelete from "../01-utils/safe-delete";
import SocketLogic from "./socket-logic";



async function getAllVacations(userId: number): Promise<VacationModel[]> {
    const sql = `SELECT V.* FROM vacations AS V 
                    LEFT JOIN userspervacations AS UPV 
                    ON V.vacationId = UPV.vacationId 
                    GROUP BY V.vacationId 
                    ORDER BY UPV.userId = ${userId}`;
    const vacations = await dal.execute(sql);
    return vacations;
}

async function getOneVacation(vacationId: number): Promise<VacationModel> {
    const sql = `SELECT * FROM vacations WHERE vacationId = ${vacationId}`;
    const info: OkPacket = await dal.execute(sql);
    let vacation = info[0];    
    
    if (!vacation) throw new ClientError(404,`id ${vacationId} not found`);

    return vacation;
}

async function addVacation(vacation: VacationModel): Promise<VacationModel> {
    const errors = vacation.validatePost();
    if (errors) throw new ClientError(404, errors);

    const extension = vacation.image.name.substr(vacation.image.name.lastIndexOf("."));     
    vacation.imageName = uuid() + extension;
    await vacation.image.mv(config.baseImageUrl + vacation.imageName);
    delete vacation.image;
    
    const sql = ` INSERT INTO vacations VALUES(
                    DEFAULT,
                    "${vacation.description}",
                    "${vacation.destination.replace(/^(.)|\s+(.)/g, c => c.toUpperCase())}",
                    "${vacation.startingDate}",
                    "${vacation.endingDate}",
                    ${vacation.price},
                    DEFAULT,
                    "${vacation.imageName}"
                )`;
    const info: OkPacket = await dal.execute(sql);
    vacation.vacationId = info.insertId;
    vacation.followersCount = 0;
    
    return vacation;
}

async function updateFullVacation(vacation: VacationModel): Promise<VacationModel> {    

    const errors = vacation.validatePut();
    
    if (errors) throw new ClientError(404, errors);

    vacation.imageName = (await getOneVacation(vacation.vacationId)).imageName;
    
    if(vacation.image){
  
        safeDelete(config.baseImageUrl + vacation.imageName);
    
        const extension = vacation.image.name.substr(vacation.image.name.lastIndexOf(".")); 
        vacation.imageName = uuid() + extension;
        await vacation.image.mv(config.baseImageUrl + vacation.imageName);
        delete vacation.image;
    }

    const sql = `UPDATE vacations SET
                    description = "${vacation.description}",
                    destination = "${vacation.destination.replace(/^(.)|\s+(.)/g, c => c.toUpperCase())}",
                    startingDate = "${vacation.startingDate}",
                    endingDate = "${vacation.endingDate}",
                    price = ${vacation.price},
                    followersCount = ${vacation.followersCount},
                    imageName = "${vacation.imageName}"
                    
                    WHERE vacationId = ${vacation.vacationId}
                `;
    await dal.execute(sql);

    return vacation;
}

async function deleteVacation(vacationId: number): Promise<void> {
    const vacation = await getOneVacation(vacationId);
    safeDelete(config.baseImageUrl + vacation.imageName);
    const sql = `DELETE FROM vacations WHERE vacationId = ${vacationId}`;
    await dal.execute(sql);
}

async function addFollower(vacation: VacationModel,userId: number): Promise<boolean>{
    const sql = `SELECT * FROM userspervacations WHERE vacationId = ${vacation.vacationId} AND userId = ${userId}`;
    const validationInfo: OkPacket = await dal.execute(sql);
    const isFollowing = validationInfo[0];

    if(isFollowing) {
        const deletionSql = `DELETE FROM userspervacations WHERE vacationId = ${vacation.vacationId} AND userId = ${userId}`;
        await dal.execute(deletionSql);
        vacation.followersCount -= 1;
        const changeFollowersNumSql = `UPDATE vacations SET followersCount = ${vacation.followersCount} WHERE vacationId = ${vacation.vacationId}`;   
        await dal.execute(changeFollowersNumSql);
        SocketLogic.emitRemoveFollower(vacation);      
        return false;
    }

    const addFollowerSql = `INSERT INTO userspervacations VALUES(${vacation.vacationId},${userId})`;
    await dal.execute(addFollowerSql);
    vacation.followersCount += 1;
    const changeFollowersNumSql = `UPDATE vacations SET followersCount = ${vacation.followersCount} WHERE vacationId = ${vacation.vacationId}`;   
    await dal.execute(changeFollowersNumSql);
    SocketLogic.emitAddFollower(vacation);
    return true;   
}

async function isFollowing(vacationId,userId): Promise<boolean> {
    const sql = `SELECT * FROM userspervacations WHERE vacationId = ${vacationId} AND userId = ${userId}`;
    const validationInfo: OkPacket = await dal.execute(sql);
    const isFollowing = validationInfo[0];
    if (isFollowing) return true;
    
    return false;

}

export default {
    getAllVacations,
    getOneVacation,
    addVacation,
    updateFullVacation,
    deleteVacation,
    addFollower,
    isFollowing
}