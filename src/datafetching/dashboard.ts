import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { URI } from "../utils";




async function dashboard() {
    try {
        const res=await axios.get(`${URI}/account/balance`,{
            headers:{
                "authorization":localStorage.getItem("token")
            }
        }
        
    )
   
    return res.data
    } catch (error:any) {
        console.log(error)
        throw new Error(error)
    }
    
}
export function dashboardfn() {
    return useMutation({
        mutationFn:dashboard
    })
}