import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { URI } from "../utils";





async function specificuser({id,amount}:{id:string, amount:number}) {
    try {
       const res=await axios.post(`${URI}/account/transfer`,{
        to:id,
        amount
    },{
        headers:{
            "authorization":localStorage.getItem("token")
        }
    })
    return res.data 
    } catch (error:any) {
        console.log(error.response.data)
        throw new Error(error.response.data.msg)
    }
    
}
export function specificuserfn() {
    return useMutation({
        mutationFn:specificuser
    })
}