import express from 'express'
import authMiddleware from '../middlewares/authMiddleware'
import { prisma } from './user'
import { z } from 'zod'


export const accountRouter=express.Router()


accountRouter.get("/balance",authMiddleware,async (req,res)=>{
    try {
        const userAccount=await prisma.account.findFirst({
    where:{
        userId:req.id as unknown as number
    },
    include:{
        user:true
    }
    })
    res.json({
        "balance":userAccount?.balance,
        "firstName":userAccount?.user.firstName
    })
    } catch (error) {
        res.json({
            msg:"Error: "+error
        })
    }

})


accountRouter.post("/transfer",authMiddleware,async(req,res)=>{
    const zodObject=z.object({
        to:z.string(),
        amount:z.number().min(1)
    })
    const {to, amount}=req.body // "to" is id (of user table)

    const tempRes=zodObject.safeParse({to, amount})
    if (!tempRes.success){
        res.status(403).json({
            "msg":"Please provide correct recipient and/or amount to transfer"
        })
        return;
    } else {
        try {
            
            const senderAccount=await prisma.account.findFirst({
                where:{
                    userId:parseInt(req.id as string)
                }
            })
            const receiverAccount=await prisma.account.findFirst({
                where:{
                    userId:parseInt(to)
                }
            })
    
            if (!senderAccount || !receiverAccount) {
                res.status(403).json({
                    "msg":"sender/ reciever account is not present"
                })
            }
            else {
                if (senderAccount.balance>=amount) {
                    await prisma.$transaction([
                        
                     prisma.account.update({
                        where:{
                            userId:senderAccount.userId as unknown as number
                        },
                        data:{
                            balance:{decrement:amount}
                        }
                    }),
                     prisma.account.update({
                        where:{
                            userId:receiverAccount.userId as unknown as number
                        },
                        data:{
                            balance:{increment:amount}
                        }
                    })
                    ])
        
                    res.json({
                        "msg":amount+" transferred successfully."
                    })
                } 
                else  {
                    res.status(403).json({
                        "msg":"Insufficient balance"
                    })
                }
            } 

        } catch (error) {
            res.status(403).json({
                "msg":"Error occurred: "+error
            })
        }
        
           
        }
        
        
    }
)