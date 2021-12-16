import { Button } from "@mui/material";

const TopNav = ({currentUser, currentWorker}) => {
    console.log(currentUser)
    return (
        <div id="top-nav">
            <p>{currentUser.name}</p>
            <p>Todays date</p>
            <Button>Log In</Button>
            <img src="" />
        </div>
    )
}

export default TopNav;