import { useQuery } from "@tanstack/react-query";
import { URI } from "../utils";
import axios from "axios";



async function allUsers() {
    try {
       const res=await axios.get(`${URI}/user/bulk`,{
        headers:{
            "authorization":localStorage.getItem("token")
        }
       }) 
       return res.data
    } catch (error:any) {
        throw new Error(error)
    }
    
}
export function allusersfn() {
    const {data, isFetching, isError}= useQuery(
        {
            queryKey:["allUsers"],
            queryFn:allUsers
        }
    )
    return {
        data,
        isFetching,
        isError
    }
}