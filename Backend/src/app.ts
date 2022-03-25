import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import expressFileUpload from "express-fileupload"; 
import config from "./01-utils/config";
import authController from "./06-controllers/auth-controller";
import errorsHandler from "./02-middleware/errors-handler";
import ClientError from "./03-Models/client-error";
import vacationController from "./06-controllers/vacations-controller";
import SocketLogic from "./05-bll/socket-logic";

const expressServer = express();

expressServer.use(cors());
expressServer.use(express.json());
expressServer.use(expressFileUpload());
expressServer.use('/images', express.static('public'))
expressServer.use("/api",vacationController);
expressServer.use("/api/auth", authController);

expressServer.use("*", (request: Request, response: Response, next: NextFunction) => {
    const clientErr = new ClientError(404, "Route Not Found");
    next(clientErr); 
});

expressServer.use(errorsHandler);

const httpServer = expressServer.listen(config.port, () => console.log("Listening..."));

SocketLogic.initSocketIo(httpServer);