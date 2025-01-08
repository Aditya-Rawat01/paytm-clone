import { NextFunction, Request, Response } from "express";
import { userSignature } from "../zodSchema";


export function signupMiddleware(req:Request,res:Response,next:NextFunction) {
    const {username, firstName, lastName, password}= req.body
    const response=userSignature.safeParse({username, firstName, lastName, password})

    if (response.success) {
        next()
    }
    else {
        res.status(411).json({
            msg:response.error
        })
    }
}