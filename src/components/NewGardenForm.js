
// component imports
import { Stack, Input } from "@mui/material"
import Button from "@mui/material/Button"

import { useState } from "react"

const NewGardenForm = ({ handleCreating, handleCreateGarden, gardens }) => {
    const [formData, setFormData] = useState({
        name: ""
    })


    const handleChange = (e) => {
        console.log(e.target.value)
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleCreate = () => {
        console.log("creating garden", formData)
        
        handleCreateGarden(formData)
        // handleCreating()
    }


    return (
        <div id="new-employee-form">
            <Stack>
                <Input className="input" name="name" placeholder="name" onChange={handleChange}/>
                <Button color="secondary" onClick={handleCreate}>Submit</Button>
            </Stack>
        </div>
    )
}

export default NewGardenForm