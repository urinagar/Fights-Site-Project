import Joi from "joi";
import Role from "./role";

class UserModel {
    public id: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public role: Role;

    constructor(user: UserModel){
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
    }

    private static registerValidationSchema = Joi.object({
        id: Joi.forbidden(),
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(20),
        username: Joi.string().required().min(5).max(20),
        password: Joi.string().required().min(6).max(20),
        role: Joi.forbidden(),
    });

    public registerValidation() {
        const result = UserModel.registerValidationSchema.validate(this);
        return result.error?.message;
    }
}

export default UserModel;