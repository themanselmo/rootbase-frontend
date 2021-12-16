import { useState } from "react"
import logo from "../assets/rootbase-logo.png"

// component imports
import { Stack } from "@mui/material"
import Button from "@mui/material/Button"
import { Input } from "@mui/material"

const LoginPage = ({ setCurrentUser }) => {
    const [loggingIn, setLoggingIn] = useState(true)

    const [formData, setFormData] = useState({
        name: "",
        password: "",
    });

    const [error, setErrors] = useState([]);

    const handleChange = (e) => {
        console.log(e.target.value)
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const stuff = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    }

    const handleLogin = (e) => {
        e.preventDefault()
        console.log("logging in: ", formData)
        fetch("/login", stuff)
        .then(res => {
        if (res.ok) {
            res.json().then((user) => {
            console.log(user);
            setCurrentUser(user);
            });
        } else {
            res.json().then((errors) => {
            console.log(errors);
            setErrors(errors.errors);
            });
        }
        })
    }

    const handleSignup = (e) => {
        e.preventDefault()
        console.log("signing up: ", formData)

        fetch("/organizations", stuff)
        .then(res => {
        if (res.ok) {
            res.json().then((user) => {
            console.log(user);
            setCurrentUser(user);
            });
        } else {
            res.json().then((errors) => {
            console.log(errors);
            setErrors(errors.errors);
            });
        }
        })
    }

    return (
        <div id="login-page">
            <img src={logo} id="login-logo"/>
            { 
                loggingIn ? 
                    <Stack> 
                        <Input className="input" name="name" placeholder="Organization Name" onChange={handleChange}/>
                        <Input className="input" name="password" placeholder="Password" type="password" onChange={handleChange}/>
                        <Button color="secondary" onClick={handleLogin}>Submit</Button>
                        <Button color="secondary" onClick={() => {setLoggingIn(false)}}>Sign Up</Button>
                    </Stack> 
                : 
                    <Stack> 
                        <Input className="input" name="name" placeholder="Organization Name" onChange={handleChange}/>
                        <Input className="input" name="password" placeholder="Password" type="password" onChange={handleChange}/>
                        <Button color="secondary" onClick={handleSignup}>Submit</Button>
                        <Button color="secondary" onClick={() => {setLoggingIn(true)}}>Log In</Button>
                    </Stack>    
            }
        </div>
    )
}

export default LoginPage