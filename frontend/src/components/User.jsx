import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LoginButton } from "./LoginButton"

export const User = () => {
    const[users,setUsers] = useState([])
    const[filter,setFilter] = useState("")

    useEffect(() => {
       axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter,{headers:{"Authorization" : "Bearer " + localStorage.getItem("token")}}).then(response => {
        setUsers(response.data.user)
       })
    },[filter])
    return <div>
    <div className="font-bold mt-6 text-lg ps-4">
        Users
    </div>
    <div className="my-2 ps-4">
        <input onChange={(e) => {
            setFilter(e.target.value)
        }} type ="text" placeholder="Search name..." className="w-full px-2 py-2  border  rounded border-slate-200"></input>
    </div>
    <div>
        {users.map(user => <UserName user = {user}/> )}
    </div>
</div>

function UserName({user}){
    const navigate = useNavigate()

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div  className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
            <LoginButton onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }} label={"Send Money"} />
        </div>
    </div>
}
}

