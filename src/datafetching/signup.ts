import axios from "axios";
import { URI } from "../utils";
import { useMutation } from "@tanstack/react-query";

async function signup(param:any) {
    
    const firstName=param[0].value
    const lastName=param[1].value
    const email=param[2].value
    const password=param[3].value
   try {
    const res=await axios.post(`${URI}/user/signup`,{
        firstName,
        lastName,
        password,
        username:email
    })
    return res.data
   } catch (error:any) {
    throw new Error(error.response.data.msg.issues[0].message)
   }
 
    
    
}


export function signUpFn() {
    return useMutation({
        mutationKey:["signup"],
        mutationFn:signup
    })
}