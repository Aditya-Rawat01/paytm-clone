import { NextFunction, Request, Response } from "express";
import { userSignature, userSigninsignature } from "../zodSchema";


export function signinMiddleware(req:Request,res:Response,next:NextFunction) {
    const {username, password}= req.body
    const response=userSigninsignature.safeParse({username, password})

    if (response.success) {
        next()
    }
    else {
        res.status(411).json({
            msg:response.error
        })
    }
}