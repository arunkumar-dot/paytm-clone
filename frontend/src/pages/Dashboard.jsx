import axios from "axios"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import {User} from "../components/User"
import { Sendmoney } from "./Sendmoney"
import { useEffect, useState } from "react"

export const  Dashboard = () =>{

    const [amount,setAmount] = useState(0)
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance",{headers : {
            Authorization : "Bearer " + localStorage.getItem("token")
        }}).then(response => {
            response = setAmount(response.data.balance)
        })
    })
    
    return <div>
        <Appbar/>
        <Balance amount={amount.toFixed(2)} />
        <User/>
    </div>
    }
