import { PrismaClient } from '@prisma/client'
import express from 'express'
import { signupMiddleware } from '../middlewares/signupMiddleware'
import jwt from 'jsonwebtoken'
import { signinMiddleware } from '../middlewares/signinMiddleware'
import authMiddleware from '../middlewares/authMiddleware'

declare global {
    namespace Express {
        interface Request {
            id? : string
        }
    }
}
export const userRouter=express.Router()

export const prisma=new PrismaClient()
userRouter.post("/signup",signupMiddleware,async(req,res)=>{
    const {username, firstName, password, lastName}=req.body
    try {
        const user=await prisma.user.create({
            data:{
                username,
                firstName,
                password,
                lastName,
                account:{
                    create:{
                        balance:5000
                    }
                }
            }
        })
        
        const userJwt=jwt.sign({id:user.id as unknown as string},process.env.JWT_SECRET as string)
        res.json({
            msg: "User signed up successfully",
            token:userJwt
        })
    } catch (error) {
        res.status(411).json({
            msg: "Error: User already exists. Try signing in"
        })
    }
    
})
userRouter.post("/signin",signinMiddleware,async(req,res)=>{
    const {username, password}=req.body 
    try {
        const user = await prisma.user.findFirst({
        where:{
           username,
           password 
        }
    })
    if (user) {
        const userJwt=jwt.sign({id:user.id as unknown as string},process.env.JWT_SECRET as string)
        res.json({
            "msg":"User signed in successfully",
            "token":userJwt
        })
    }
    else {
        res.status(411).json({
            "msg":"User not found"
        })
    }
    } catch (error) {
        res.json({
            msg:"Db error:"+error
        })
    }
    
})
userRouter.put("/update",authMiddleware,async(req,res)=>{
    const {password,firstName,lastName}=req.body
    try {
        await prisma.user.update({
        where:{
            id:req.id as unknown as number
        },
        data:{
            password,
            firstName,
            lastName
        }
    }) 
    res.json({
        "msg":"User updated successfully"
    })
    } catch (error) {
        res.json({
            "msg":"Error while updating user"
        })
    } 
})

userRouter.get("/bulk",authMiddleware,async (req,res)=>{
    const filter=req.query.filter || ""
    
    const response= await prisma.user.findMany({
        where:{
            OR:[
                {
                    firstName:{
                        contains:filter as string,
                        mode:"insensitive"
                    }
                }, {
                    lastName:{
                        contains:filter as string,
                        mode: "insensitive"
                    }
                }
            ]
             
        },
        select:{
            username:true,
            firstName:true,
            lastName:true,
            id:true
        }
        
    })
    res.json({
        "msg":response
    })
})