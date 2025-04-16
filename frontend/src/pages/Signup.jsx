import { useState } from "react";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Subheading } from "../components/Subheading";
import { LoginButton } from "../components/LoginButton";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { Bottomwarning } from "../components/Bottomwarning";


export const Signup = () => {
    
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate();
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-auto px-4">
                <Heading label = {"Sign up"}/>
                <Subheading label = {"Enter your information to create an account"}/>
                <Inputbox onChange={ e => {setFirstName(e.target.value)}} placeholder={"John"} label={"First Name"} />
                <Inputbox onChange={ e => {setLastName(e.target.value)}} placeholder={"Doe"} label={"Last Name"} />
                <Inputbox onChange={ e => {setUsername(e.target.value)}} placeholder={"username"} label={"Email "} />
                <Inputbox onChange={ e => {setPassword(e.target.value)}} placeholder={"password"} label={"Password "}/>
                <div className="pt-4">
                    <LoginButton onClick={ async () =>{ const Response = 
                    await axios.post("http://localhost:3000/api/v1/user/signup",{username,firstName,lastName,password})
                    localStorage.setItem("token",Response.data.token)
                    navigate("/dashboard")
                    }} label = {"Sign up"} />
                </div>
            <Bottomwarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
            </div>
        
        </div>
        
    </div>
}