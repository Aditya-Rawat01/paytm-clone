import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { URI } from "../utils";

async function signin(param:any) {
    const username=param[0].value
    const password=param[1].value
    try {
        const res=await axios.post(`${URI}/user/signin`,{
            username,
            password
        })
        return res.data
    } catch (error:any) {
        throw new Error(error.response.data.msg.issues[0].message)
    }
    
}


export function signinFn() {
    return useMutation({
        mutationFn:signin
    }
    )
}