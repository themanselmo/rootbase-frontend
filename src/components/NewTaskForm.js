
// component imports
import { Stack, Input } from "@mui/material"
import Button from "@mui/material/Button"

import { useState } from "react"

const NewTaskForm = ({ handleCreating, handleCreateTask }) => {
    const [formData, setFormData] = useState({
        name: "",
        due_date: ""
    })


    const handleChange = (e) => {
        console.log(e.target.value)
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleCreate = () => {
        console.log("creating task", formData)
        handleCreateTask(formData)
        handleCreating()
    }


    return (
        <div id="new-employee-form">
            <Stack>
                <Input className="input" name="name" placeholder="name" onChange={handleChange}/>
                <Input className="input" name="due_date" placeholder="due date YYYY/MM/DD" onChange={handleChange}/>
                <Button color="secondary" onClick={handleCreate}>Submit</Button>
            </Stack>
        </div>
    )
}

export default NewTaskForm