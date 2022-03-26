import { OkPacket } from "mysql";
import jwt from "../01-utils/jwt";
import ClientError from "../03-models/client-error";
import CredentialsModel from "../03-models/credentials-model";
import UserModel from "../03-models/user-model";
import dal from "../04-dal/dal";

async function register(user: UserModel): Promise<string> {
    const errors = user.registerValidation();
    if (errors) throw new ClientError(400,errors);

    const sqlValidation = `SELECT * FROM users WHERE username = '${user.username.trim()}' `;

    const isUserExist = await dal.execute(sqlValidation);
    
    if (isUserExist.length !== 0) throw new ClientError(409, 'Username already exist');

    const sql = `INSERT INTO users  
                    VALUES(
                    DEFAULT,
                    '${user.firstName.trim().replace(/^(.)|\s+(.)/g, c => c.toUpperCase()) }',
                    '${user.lastName.trim().replace(/^(.)|\s+(.)/g, c => c.toUpperCase()) }',
                    '${user.username.trim()}',
                    '${user.password.trim()}',
                    DEFAULT
                    )`;
    const info: OkPacket = await dal.execute(sql); 
    user.id = info.insertId;               
    delete user.password;
    const token = jwt.getNewToken(user);
    return token;
}

async function login(credentials: CredentialsModel): Promise<string> {
    const sql = `SELECT * FROM users WHERE username = '${credentials.username}' AND password = '${credentials.password}'`;
    
    const info: OkPacket = await dal.execute(sql);
    let user: UserModel = info[0];
        
    if (!user) throw new ClientError(401, "Incorrect username or password");
    
    const token = jwt.getNewToken(user);
    return token;
}

export default {
    register,
    login
};