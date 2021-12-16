import { Button } from "@mui/material";
import { useNavigate } from "react-router";

const TopNav = ({currentUser, currentWorker, setCurrentWorker}) => {
    console.log(currentUser)

    const navigate = useNavigate();

    const handleLogout = () => {
        fetch('/logout_employee', {
            method: "DELETE"
        })
        .then(setCurrentWorker(null))
        
    }

    return (
        <div id="top-nav">
            <p>{currentUser.name}</p>
            <p>Todays date</p>
            {currentWorker ? 
                <>
                <p>{currentWorker.name}</p>
                <Button onClick={handleLogout}>Log Out</Button>
                </>
                 : 
                
                <Button onClick={() => navigate('/EmployeeLogin')}>Log In</Button>}
            
            <img src="" />
        </div>
    )
}

export default TopNav;