
import { allusersfn } from "../datafetching/allusers"

import AllusersFrontend from "./allusersFrontend"

export interface valueInterface {
    username: string,
    firstName: string,
    id:number,

}
export default function HeroComponent({balance, name}:{balance:number, name:string}) {
    const {data, isFetching, isError}=allusersfn()
    
    
    if (isFetching) {
        return <div className="text-xl w-screen h-[80%] flex items-center justify-center">Fetching all the users...</div>
    }
    if (isError) {
        return <div className="text-xl w-screen h-[90%] flex items-center justify-center">Error occurred. Refresh again</div>
    }
    const arr:valueInterface[]=data.msg.filter((index:valueInterface)=>index.firstName!=name)
    return (<div className="w-full h-[calc(100vh-82px)]">
        <div className="w-full h-20 p-3 text-xl">
            <p>Your Balance: Rs.{balance}</p>
        </div>
        <div className="w-full ">
            <AllusersFrontend arr={arr}/>
        </div>
    </div>)
}