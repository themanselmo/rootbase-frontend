// component imports
import { Stack } from "@mui/material"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { Input } from "@mui/material"
// import { createTheme, ThemeProvider } from "@mui/material/styles"
// react imports
import { useState } from "react"

const Login = ({ setCurrentUser }) => {
    const [formData, setFormData] = useState({
        username: "",
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
        console.log(formData)
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

    // const theme = createTheme({
    //     palette: {
    //         primary: {
    //         // Purple and green play nicely together.
    //         main: '#598F14',
    //         },
    //         secondary: {
    //         // This is green.A700 as hex.
    //         main: '#598F14',
    //         },
    //     },
    // });


    return (
        <div className="login-form"> 
                <Stack> 
                    <Input className="input" name="username" placeholder="Organization Name" onChange={handleChange}/>
                    <Input className="input" name="password" placeholder="Password" type="password" onChange={handleChange}/>
                    <Button color="secondary" onClick={handleLogin}>Submit</Button>
                </Stack>
        </div>
    )
}

export default Login