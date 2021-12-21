import { Button } from "@mui/material";
import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router";

const TopNav = ({currentUser, currentWorker, setCurrentWorker, currentAvatar, setCurrentAvatar}) => {
    // console.log(currentUser)
    const currentDate = new Date();
    let cDay = currentDate.getDate();
    let cMonth = currentDate.getMonth() + 1;
    let cYear = currentDate.getFullYear();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        fetch('/logout_employee', {
            method: "DELETE"
        })
        .then(setCurrentWorker(null))
        
    }

    
    useEffect(()=>{
        fetch("/me2")
        .then(res => {
        if(res.ok) {
            res.json().then((data) => {
            setCurrentAvatar(data.avatar)
            console.log("Reloading from app.js")
            })
        }
        else {
            // setCurrentWorker(null)
        }
        })
    }, [])
    // console.log(currentDate)
    console.log(currentWorker)
    return (
        <div id="top-nav">
            <div id="nav-name">
                <p>{currentUser.name}</p>
            </div>
            <div id="nav-stuff">
                <p>{cYear} / {cMonth} / {cDay}</p>
                {currentWorker ? 
                    <>
                        {currentAvatar ? 
                            <img id="avatar" src={`http://localhost:3000/${currentAvatar}`} /> 
                            : 
                            <div id="div-avatar">{currentWorker.name.charAt(0)}</div>}
                        <p>{currentWorker.name}</p>
                        <Button onClick={handleLogout}>Log Out</Button>
                    </>
                    : 
                    <Button onClick={() => navigate('/EmployeeLogin')}>Log In</Button>}
                
            </div>
        </div>
    )
}

export default TopNav;