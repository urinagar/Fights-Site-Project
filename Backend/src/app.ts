import dotenv from "dotenv";
dotenv.config();

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import expressFileUpload from "express-fileupload"; 
import config from "./01-utils/config";
import authController from "./06-controllers/auth-controller";
import errorsHandler from "./02-middleware/errors-handler";
import vacationController from "./06-controllers/vacations-controller";
import SocketLogic from "./05-bll/socket-logic";
import path from "path";

const expressServer = express();

expressServer.use(cors());
expressServer.use(express.json());
expressServer.use(express.static(path.join(__dirname, "./07-frontend")));
expressServer.use(expressFileUpload());
expressServer.use('/images', express.static('assets'))
expressServer.use("/api",vacationController);
expressServer.use("/api/auth", authController);

expressServer.use("*", (request: Request, response: Response, next: NextFunction) => {
   // const clientErr = new ClientError(404, "Route Not Found");
    //next(clientErr);
    response.sendFile(path.join(__dirname, "./07-frontend/index.html")); 
});

expressServer.use(errorsHandler);

const httpServer = expressServer.listen(config.port, () => console.log("Listening..."));

SocketLogic.initSocketIo(httpServer);