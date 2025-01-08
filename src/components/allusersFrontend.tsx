import { valueInterface } from "./HeroComponent";
import {  useState } from "react"
import { Link } from "react-router-dom"
export default function AllusersFrontend({arr}:{arr:valueInterface[]}) {
    const [input,setInput]=useState<string>()
    return (
    <div className="w-full flex flex-col items-center">
        <input type="text" placeholder="Search users..." className="focus:outline-none w-[80%] p-3 rounded-lg border-2 border-gray-300" onChange={(e)=>setInput(e.target.value)}></input>
                <div className="p-5"><p>All Users</p></div>
            <div className="w-full">
                {arr.map((index:valueInterface)=>
                 (index.username.includes(input||"")|| index.firstName.includes(input|| "")) && <div className="flex w-full justify-between items-center p-5 overflow-y-auto" key={index.username}>
                    <div className="flex items-center h-full gap-3">
                        <div className="h-12 rounded-full bg-stone-200 w-12 flex items-center justify-center">{"U"}</div>
                        <div><p>{index.firstName}</p>
                        <p className="text-sm text-gray-600">Mail: {index.username} </p></div>
                    </div>
                    <Link className="rounded-lg" to={{pathname:"/sendmoney", search:`id=${index.id}&name=${index.username}`}}><button className="bg-green-500 text-white rounded-lg p-3">Send Money</button></Link>
                    
                    </div>)}
            </div>
    </div>)
}