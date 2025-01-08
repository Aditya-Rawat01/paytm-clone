export default function Topbar({name}:{name:string}) {
    return (<div className="h-20 w-full border border-gray-300 flex items-center justify-between p-10">
        <div className="text-2xl">SendM. app</div>
        <div>Hello {name}</div>
    </div>)
}