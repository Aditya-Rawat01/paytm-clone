
import { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signinFn } from "../datafetching/signin";

export  default function Signin() {
    const navigate=useNavigate()
    const {mutate, isPending, isError, isSuccess, error, data} = signinFn()
    function Submit(e:FormEvent) {
        const arr:any=e.target
        mutate(arr)
       
        e.preventDefault()
    }
    if (isPending){
        return <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl">Signing In...</div>

    }
    if (isSuccess) {
        navigate("/dashboard")
        console.log(data.token)
        localStorage.setItem("token","Bearer "+data.token)
    }
    return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
        {isError && <div className="text-black absolute top-0 left-1/2 -translate-x-1/2 rounded-lg bg-white w-[90%] h-fit mt-3 flex items-center justify-center text-center"> {error.message==="Cannot read properties of undefined (reading '0')"?"Email not found/ Wrong password":error.message}</div>}
        <form onSubmit={(e)=>Submit(e)} className="w-5/6 md:w-1/2 lg:w-1/4 h-[60%] flex flex-col justify-around items-center rounded-xl bg-white">
            <p className="text-4xl">Login</p>
           
            <div className="flex flex-col w-[70%] gap-2">
            <label>Email</label>
            <input type="text" className="w-full border border-gray-400 rounded-lg p-2 focus:outline-none" required placeholder="john@mail"/>
            </div>
            
            <div className="flex flex-col w-[70%] gap-2">
            <label>Password</label>
            <input type="text" className="w-full border border-gray-400 rounded-lg p-2 focus:outline-none" required />
            </div>
            <button type="submit" className="border bg-black text-white w-[70%] p-2 rounded-full">Login</button>
            <p>Don't have account? <Link to={"/signup"} className="underline">Signup</Link></p>
        </form>
    </div>
    )
}