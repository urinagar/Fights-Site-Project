import { UploadedFile } from "express-fileupload";
import Joi from "joi";

class VacationModel {
    public vacationId: number;
    public description: string;
    public destination: string;
    public startingDate: string;
    public endingDate: string;
    public price: number;
    public followersCount: number;
    public imageName: string; 
    public image: UploadedFile; 

    public constructor(vacation: VacationModel){
        this.vacationId = vacation.vacationId;
        this.description = vacation.description;
        this.destination = vacation.destination;
        this.startingDate = vacation.startingDate;
        this.endingDate = vacation.endingDate;
        this.price = vacation.price;
        this.followersCount = vacation.followersCount;
        this.imageName = vacation.imageName;
        this.image = vacation.image;
    }

    private static postValidationSchema = Joi.object({
        vacationId: Joi.forbidden(),
        description: Joi.string().required().min(20).max(500),
        destination: Joi.string().required().min(3).max(50),
        startingDate: Joi.date().required(),
        endingDate: Joi.date().required(),
        price: Joi.number().required().positive().min(1).max(20000),
        followersCount: Joi.forbidden(),
        imageName: Joi.forbidden(),
        image: Joi.object().required()
    });

    private static putValidationSchema = Joi.object({
        vacationId: Joi.required(),
        description: Joi.string().required().min(20).max(500),
        destination: Joi.string().required().min(3).max(50),
        startingDate: Joi.date().required(),
        endingDate: Joi.date().required(),
        price: Joi.number().required().positive().min(1).max(20000),
        followersCount: Joi.optional(),
        imageName: Joi.forbidden(),
        image: Joi.object().optional()
    });

    public validatePost() {
        const result = VacationModel.postValidationSchema.validate(this);
        return result.error?.message;
    }

    public validatePut() {
        const result = VacationModel.putValidationSchema.validate(this);        
        return result.error?.message;
    }

}

export default VacationModel;