import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default class Middleware {
    static auth(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization;

        if (!token) {
            return res.sendStatus(401);
        }

        const data = jwt.verify(token,
            `${process.env.TOKEN_SECRET_KEY}`
        );

        res.locals.data = data;

        next();
    }
}