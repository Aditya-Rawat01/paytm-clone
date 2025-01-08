import express from 'express'
import { userRouter } from './user'
import { accountRouter } from './account'

export const v1Router=express.Router()

v1Router.use("/user",userRouter)
v1Router.use("/account",accountRouter)
v1Router.get("/",(req,res)=>{
    res.json({
        msg:"gell"
    })
})
