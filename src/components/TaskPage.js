import SideNav from "./SideNav"
import TopNav from "./TopNav"
import Button from "@mui/material/Button"
import { useEffect, useState } from "react"
import TaskDetail from "./TaskDetail"
import NewTaskForm from "./NewTaskForm"

const TaskPage = ({ currentUser, currentWorker, setCurrentWorker }) => {


    const [tasks, setTasks] = useState([])
    const [myTasks, setMyTasks] = useState([])
    const [focusedTask, setFocusedTask] = useState(null)
    const [displayMyTasks, setDisplayMyTasks] = useState(false)
    const [creating, setCreating] = useState(false)

    const listTasks = (tasks) => tasks.map((task) => <div  onClick={() => setFocusedTask(task)} className="task-card">
        <p>{task.name}</p>
        <p>Status: {task.status}</p>
        <p>Due: {task.due_date}</p>
    </div>)

    useEffect(()=>{
        fetch("/me")
        .then(r => r.json())
        .then(data => setTasks(data.tasks))
    }, [])

    const handleTaskView = (val) => {
        setDisplayMyTasks(val)
    }

    const getMyTasks = () => {
        fetch("/my_tasks")
        .then(r => r.json())
        .then(data => {
            let isolatedTasks = data.map(item => item.task)
            setMyTasks(isolatedTasks)
        })
    }

    const viewMyTasks = () => {
        getMyTasks()
        handleTaskView(true)
    }

    const handleCreating = () => setCreating(!creating)

    const handleCreateTask = (newTask) => {

        fetch('/tasks', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        })
        .then(res => res.json())
        .then(data => setTasks([newTask, ...tasks]))

    }

    return (
        <div id="task-page">
            <SideNav />
            <div id="task-page-content">
                <TopNav currentUser={currentUser} 
                    currentWorker={currentWorker} 
                    setCurrentWorker={setCurrentWorker}
                />
                { focusedTask ? 
                    <div id="task-list-content">
                        <TaskDetail 
                            task={focusedTask} 
                            setFocusedTask={setFocusedTask}
                            currentWorker={currentWorker}
                            setTasks={setTasks}
                        />
                    </div>
                    :
                    <div id="task-list-content">
                        <div id="task-buttons">
                            <Button onClick={() => handleTaskView(false)}>All Tasks</Button>
                            {currentWorker ? 
                                <>
                                    <Button onClick={viewMyTasks}>My Tasks</Button> 
                                    <Button onClick={handleCreating}>New Task</Button>
                                </>   
                                    : 
                                null
                            }
                        </div>
                        {
                            creating ? 
                                <NewTaskForm 
                                    handleCreateTask={handleCreateTask} 
                                    handleCreating={handleCreating}
                                />
                                :
                                displayMyTasks ? 
                                    <div id="tasks">
                                        <h1>My Tasks</h1>
                                        {listTasks(myTasks)}
                                    </div>
                                    :
                                    <div id="tasks">
                                    {/* <h1>Current Tasks</h1> */}
                                        {listTasks(tasks)}
                                    {/* <h1>Upcoming Tasks</h1>

                                    <h1>Completed Tasks</h1> */}
                                </div>
                                

                        }
                        
                    </div>
                }
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