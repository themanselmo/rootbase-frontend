import { useState } from "react"
import logo from "../assets/rootbase-logo.png"
import Login from "./Login"

const LoginPage = ({ setCurrentUser }) => {
    const [loggingIn, setLoggingIn] = useState(true)

    return (
        <div id="login-page">
            <img src={logo} id="login-logo"/>
            { loggingIn ? <Login setCurrentUser={setCurrentUser}/> : "Sign up" }
        </div>
    )
}

export default LoginPage