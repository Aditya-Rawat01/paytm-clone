import express, { Request, Response } from 'express'
import { v1Router } from './routes'
import cors from 'cors'
const app=express()
app.use(cors())
app.use(express.json())

app.use("/api/v1",v1Router)


app.listen(3000)