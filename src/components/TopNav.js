import { Button } from "@mui/material";
import { useNavigate } from "react-router";

const TopNav = ({currentUser, currentWorker, setCurrentWorker}) => {
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
    // console.log(currentDate)
    return (
        <div id="top-nav">
            <div id="nav-name">
                <p>{currentUser.name}</p>
            </div>
            <div id="nav-stuff">
                <p>{cYear} / {cMonth} / {cDay}</p>
                {currentWorker ? 
                    <>
                        <p>{currentWorker.name}</p>
                        <Button onClick={handleLogout}>Log Out</Button>
                    </>
                    : 
                    <Button onClick={() => navigate('/EmployeeLogin')}>Log In</Button>}
                
                <img src="" />
            </div>
        </div>
    )
}

export default TopNav;