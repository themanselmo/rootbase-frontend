import { Button } from "@mui/material"

const TaskDetail = ({ task, setFocusedTask, currentWorker, setTasks }) => {

    const startTask = () => {
       let newTask = {...task};

        newTask.status = 'in progress'
        setTasks((prev)=>{
            return prev.map(task => {
                if(task.id === newTask.id) {
                    return newTask
                } else {
                    return task
                }
            })
        })
        setFocusedTask(newTask)
        sendUpdatedTask(newTask)
        sendCreateEmployeeTask(currentWorker)
    }

    const finishTask = () => {
        let newTask = {...task};
        newTask.status = 'finished'
        setTasks((prev)=> prev.map(task => task.id === newTask.id ? newTask : task))
        setFocusedTask(newTask)

        sendUpdatedTask(newTask)
    }

    const sendUpdatedTask = (updatedTask) => {
        console.log("sending fetch to update task", task)
        fetch(`/tasks/${updatedTask.id}`, {
            method: "PATCH",
            headers: {
             "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTask),
        })
    }

    const sendCreateEmployeeTask = (employee) => {
        console.log("sending fetch to post new employee task")
        
        const et = {
            employee_id: employee.id, 
            task_id: task.id
        }

        fetch('/employee_tasks', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(et)
        })
    }

    console.log('rerendering')
    return (
        <div className="task-detail">
            <Button onClick={() => setFocusedTask(null)}>Close</Button>
            <h1>{task.name}</h1>
            <p>{task.status}</p>
            <p>{task.due_date}</p>
            { currentWorker ? 
                task.status === 'incomplete' ? 
                    <Button onClick={startTask}>Start Task</Button> 
                    :
                    <Button onClick={finishTask}>Finish Task</Button>
                : 
                null
            }
        </div>
    )
}

export default TaskDetail