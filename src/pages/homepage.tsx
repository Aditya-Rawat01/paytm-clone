import { Link } from "react-router-dom";

export default function Homepage() {
    return (
    <div className="w-screen h-screen flex items-center flex-col justify-center">
        <div className="flex w-[90%] h-[90%] items-center flex-col justify-around shadow-md shadow-lime-600 rounded-lg">
            <p className="text-2xl font-semibold">Paytm Clone</p>
            <div className="flex gap-3">
                <Link className="bg-black text-white p-3 rounded-lg" to={"/signup"}><p>Signup here</p></Link>
                <Link className="bg-black text-white p-3 rounded-lg" to={"/signin"}><p>Signin here</p></Link>
            </div>
            <div className="text-center flex justify-center">
                Aim:
                To learn and practice crud operations.

            </div>
            <div className="text-center flex justify-center underline underline-offset-4">
                Tech Stack: React, express, Prisma w postgress, react query, tailwind
            </div>
        </div>
        </div>)
}