import SideNav from "./SideNav"
import TopNav from "./TopNav"
import Button from "@mui/material/Button"

const TaskPage = ({ currentUser, currentWorker }) => {


    return (
        <div id="task-page">
            <SideNav />
            <div id="task-page-content">
                <TopNav currentUser={currentUser} currentWorker={currentWorker}/>
                <div id="task-list-content">
                    <div id="task-buttons">
                        <Button>All Tasks</Button>
                        {currentWorker ? <Button>My Tasks</Button> : null}
                    </div>
                    <div id="tasks">
                        <h1>Current Tasks</h1>
        
                        <h1>Upcoming Tasks</h1>

                        <h1>Completed Tasks</h1>
                    </div>
                </div>
            </div>
            
            {/*
                top nav
                side nav
                task view
                task card
            */}
        </div>
    )
}

export default TaskPage