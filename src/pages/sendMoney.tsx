import { Link, useLocation, useNavigate } from "react-router-dom"
import { specificuserfn } from "../datafetching/specificuser"
import { useState } from "react"

export default function SendMoney() {
    const location = useLocation()
    const [amount,setAmount]=useState(0)
    const query= new URLSearchParams(location.search)
    const id=query.get('id')
    const username=query.get('name')
    const {data, mutate, isPending, isError, error}=specificuserfn()
    const navigate=useNavigate()
    function initiate() {
        if(id!=null) {
            mutate({id,amount})
        } else {
            return <>Not valid user. Please go back to dashboard</>
        }
        
    }
    if (isPending) {
        return <div className="flex w-screen h-screen items-center justify-center">
                <div className="rounded-lg bg-purple-600 w-3/4 sm:w-1/2 lg:w-1/3 h-[40%] shadow-md shadow-gray-400 flex items-center justify-around flex-col">
                    <p className="text-xl  text-white font-semibold">Payment Initiated</p>
                </div>
                </div>
    }
    if (isError) {
        return <div className="flex w-screen h-screen items-center justify-center">
                    <div className="rounded-lg w-3/4 sm:w-1/2 lg:w-1/3 h-[40%] shadow-md shadow-gray-400 flex items-center justify-around flex-col">
                        <p className="text-2xl">Transaction failed</p>  
                        <p className="bg-red-600 text-white rounded-full p-3">{error.message}</p>
                    </div>
                </div>
    }
    if (data) {
        return <div className="flex w-screen h-screen items-center justify-center">
        <div className="rounded-lg w-3/4 sm:w-1/2 lg:w-1/3 h-[40%] shadow-md shadow-gray-400 flex items-center justify-around flex-col">
                <div className="text-2xl font-bold text-center">Rs. {data.msg}</div>
                <div className="text-3xl rounded-xl w-3/4 h-1/4 flex flex-col items-center justify-between font-semibold ">
                <p className="text-lg">to</p>
                {username}
                </div>
                <div className="w-full flex items-center flex-col gap-3">
                <Link to={"/dashboard"} className=" w-[80%] h-12"><button className="w-full h-full rounded-lg bg-green-500 text-white text-lg"  disabled={isPending}>Go Back</button></Link>
                </div>
        </div>
    </div>
    }
    return (
    <div className="flex w-screen h-screen items-center justify-center">
        <div className="rounded-lg relative w-3/4 sm:w-1/2 lg:w-1/3 h-[60%] shadow-md shadow-gray-400 flex items-center justify-around flex-col">
                <div className="flex items-center ">
                    <p className="absolute top-[5%] left-[5%] hover:cursor-pointer bg-red-500 text-white w-24 h-12 rounded-full flex items-center justify-center" onClick={()=>navigate("/dashboard")}>Go Back</p>
                    <p className="text-2xl font-bold">Send Money</p></div>
                <div className="text-xl rounded-xl w-3/4 h-12 flex items-center justify-center font-semibold">{username}</div>
                <div className="w-full flex items-center flex-col gap-3">
                    <div className="w-[80%] "><p>Amount {`(in Rs)`}</p></div>
                    <input className="w-[80%] h-12 rounded-lg  focus:outline-none p-3  border border-gray-300" placeholder="Enter Amount" type="text" onChange={(e)=>setAmount(parseInt(e.target.value))}></input>
                    <button className="w-[80%] h-12 rounded-lg bg-green-500 text-white text-lg" onClick={initiate} disabled={isPending}>Initiate Transfer</button>
                </div>
        </div>
    </div>)
}