import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
export default function authMiddleware(req:Request,res:Response,next:NextFunction) {
    const token=req.headers.authorization?.slice(7) // have to pass like "Bearer {actual token}"
    try {
        const response=jwt.verify(token as string ,process.env.JWT_SECRET as string) as JwtPayload
        req.id=response.id
        next()
    } catch (error) {
        res.status(403).json({
            "msg":"Invalid Token. Signup/in first"+ error
        })
    }
    
}