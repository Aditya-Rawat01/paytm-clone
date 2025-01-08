
import { useEffect } from "react";
import HeroComponent from "../components/HeroComponent";
import Topbar from "../components/Topbar";
import { dashboardfn } from "../datafetching/dashboard";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate=useNavigate()
    const {mutate, data, isPending,isError}=dashboardfn()
    useEffect(()=>{mutate()},[])
    
    function timeout() {
        setTimeout(()=> {
               navigate("/signup") 
            },5000)
    }
    
    if (isPending) {
        return <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl">Loading Dashboard...</div>
    }
    if (isError) {
        timeout()
        return <div className="w-screen h-screen text-xl flex items-center text-center justify-center"><p>User not signedup/in.<br/> Redirecting to signup page...</p></div>
    }
    if (!data) {
        return <>No data available</>
    }
    return (
    <div className="w-screen h-screen">
        <Topbar name={data.firstName}/>
        <HeroComponent balance={data.balance} name={data.firstName}/>
    </div>)
}