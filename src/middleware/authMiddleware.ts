import Express from 'express';
import Jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { userModel } from "../models/userModel";

export interface UserRequest extends Express.Request {
    user?: any
}

export const protect = asyncHandler(async (req: UserRequest, res, next: Express.NextFunction) => {
    let token
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        const secret = process.env.JWT_SECRET || 'topSecret';
        try {
            // get token from header
            token = req.headers.authorization.split(' ')[1];

            // verify the token
            const decoded = Jwt.verify(token, secret);

            // get user from the token
            req.user = await userModel.findById((<any>decoded).id).select('-password');

            next();
        } catch (error) {
           console.log(error);
           res.status(401);
           throw new Error('Not Authorized')
        }
    }

    if(!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
})