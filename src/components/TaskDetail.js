import { Button, Input, Stack } from "@mui/material"
import { useEffect, useState } from "react";

const TaskDetail = ({ task, setFocusedTask, currentWorker, setTasks }) => {

    const [comments, setComments] = useState([])
    const [input, setInput] = useState('')

    useEffect(()=>{
        fetch(`comments/${task.id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setComments(data)
        })
    },[])

    const renderComments = () => comments.map((comment) => <div className="task-comment">
      {comment.employee.name}: {comment.content} | Posted at: {comment.created_at} 
    </div>)

    const postComment = (comment) => {
        if(comment !== '') {

            let newComment = {
                employee_id: currentWorker.id,
                task_id: task.id,
                content: comment
            }

            fetch('comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newComment)
            })
            .then(res => res.json())
            .then(data => {
                console.log('comment added: ', data)
                setComments([...comments, data])
            })
        }
    }

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

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    console.log(task)
    return (
        <div className="task-detail">
            <Button onClick={() => setFocusedTask(null)}>Close</Button>
            <h1>{task.name}</h1>
            <p>{task.status}</p>
            <p>{task.due_date}</p>
            <Stack>
                { currentWorker ? 
                task.status === 'incomplete' ? 
                    <Button onClick={startTask}>Start Task</Button> 
                    :
                    <Button onClick={finishTask}>Finish Task</Button>
                : 
                null
                }
                { currentWorker ? 
                    <>
                    <Input onChange={handleChange}/>
                    <Button onClick={() => postComment(input)}>Submit Comment</Button>
                    </> 
                    :
                    null
                }
            </Stack>
            <div className="comment-section">
                { renderComments() }
            </div>
            
        </div>
    )
}

export default TaskDetail