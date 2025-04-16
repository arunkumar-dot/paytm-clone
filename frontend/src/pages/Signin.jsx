import { useState } from "react";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Subheading } from "../components/Subheading";
import { LoginButton } from "../components/LoginButton";
import axios from "axios";
import { Bottomwarning } from "../components/Bottomwarning";
import {useNavigate} from "react-router-dom"

export const Signin = () => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
   return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-auto px-4">
                <Heading label={"Sign In"}/>
                <Subheading label={"Enter your information to log into your account"}/>
                <Inputbox label={"Username"} placeholder={"john@gmail.com"} onChange={ e => {
                    setUsername(e.target.value)
                }}/>
                <Inputbox label={"Password"} placeholder={"Password"} onChange={ e => {
                    setPassword(e.target.value)
                }}/>
                <LoginButton label={"Log in"} onClick={ async () => {
                    const response = await axios.post("http://localhost:3000/api/v1/user/signin",{username,password})
                    localStorage.getItem("token",response.data.token)
                    console.log(response.data.token);
                    
                    navigate("/dashboard")
                }}/>
                <Bottomwarning label={"Don't have an account ? "} buttonText={"Sign up"} to={"/signup"}/>
            </div>
        </div>
    </div>
}