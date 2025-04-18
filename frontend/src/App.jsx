import {
  BrowserRouter,
  Route,
  Routes
} from  "react-router-dom"
import {Signup} from "./pages/Signup"
import {Dashboard} from "./pages/Dashboard"
import {Signin} from "./pages/Signin"
import {Sendmoney} from "./pages/Sendmoney"

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element = {<Signup/>} />
        <Route path="/signin" element = {<Signin/>}/>
        <Route path="/dashboard" element = {<Dashboard/>}/>
        <Route path="/send" element = {<Sendmoney/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
