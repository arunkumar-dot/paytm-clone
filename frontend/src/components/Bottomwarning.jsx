import { Link } from "react-router-dom"

export function Bottomwarning({label,buttonText,to}){
    return <div className="py-2 text-sm flex justify-center">
                <div>
                    {label}
                </div>
                <Link className="pointer underline pl-1 curosor-pointer" to = {to}>
                {buttonText}
                </Link>
    </div>
} 