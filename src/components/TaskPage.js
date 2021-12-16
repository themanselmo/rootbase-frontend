import SideNav from "./SideNav"
import TopNav from "./TopNav"
import Button from "@mui/material/Button"
import { useEffect, useState } from "react"

const TaskPage = ({ currentUser, currentWorker, setCurrentWorker }) => {

    const [tasks, setTasks] = useState([])

    const listTasks = (tasks) => tasks.map((task) => <div className="task-card">
        <p>{task.name}</p>
        <p>{task.status}</p>
        <p>{task.due_date}</p>
    </div>)

    useEffect(()=>{
        fetch("/me")
        .then(r => r.json())
        .then(data => setTasks(data.tasks))
    }, [])
    
    return (
        <div id="task-page">
            <SideNav />
            <div id="task-page-content">
                <TopNav currentUser={currentUser} 
                    currentWorker={currentWorker} 
                    setCurrentWorker={setCurrentWorker}
                />
                <div id="task-list-content">
                    <div id="task-buttons">
                        <Button>All Tasks</Button>
                        {currentWorker ? <Button>My Tasks</Button> : null}
                    </div>
                    <div id="tasks">
                        <h1>Current Tasks</h1>
                            {listTasks(tasks)}
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