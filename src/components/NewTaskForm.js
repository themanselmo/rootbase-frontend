
// component imports
import { Stack, Input, Select, MenuItem, FormControl, Snackbar, Grow } from "@mui/material"
import MuiAlert from '@mui/material/Alert';

import Button from "@mui/material/Button"
import { Checkbox } from "@mui/material"
import { FormControlLabel } from "@mui/material"

import { useState } from "react"

const NewTaskForm = ({ handleCreating, handleCreateTask, gardens }) => {
    const [formData, setFormData] = useState({
        name: "",
        due_date: ""
    })
    const [selectedGarden, setSelectedGarden] = useState({})

    const [open, setOpen] = useState(false);
	const [transition, setTransition] = useState(Grow);
    const [alertMessage, setAlertMessage] = useState('');

    const handleChange = (e) => {
        console.log(e.target.value)
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleCreate = () => {
        console.log("creating task", formData)
        
        handleCreateTask(formData, selectedGarden)
        setAlertMessage('Task Added!');
		handleClick(Grow);
        // handleCreating()
    }

    const handleSelectedGarden = (gardenID) => {
        console.log(gardenID.name)
        setSelectedGarden(gardenID)
    }

    const handleClick = (transition) => {
		setOpen(true);
		setTransition(transition);
	};

    const handleClose = () => {
        setOpen(false);
	};

    return (
        <div id="new-employee-form">
            <Snackbar
					open={open}
					onClose={handleClose}
					TransitionComponent={transition}
					autoHideDuration={2000}
					// message="Item Deleted!"
					key={transition.name}
				>
					<MuiAlert
						elevation={6}
						variant="filled"
						onClose={handleClose}
						severity="success"
						sx={{ width: '100%' }}
					>
						{alertMessage}
					</MuiAlert>
			</Snackbar>
            <Stack>
                <Input className="input" name="name" placeholder="name" onChange={handleChange}/>
                <Input className="input" name="due_date" placeholder="due date YYYY/MM/DD" onChange={handleChange}/>
                <FormControl>
                    <Select value={selectedGarden==={} ? selectedGarden.name : ""}>

                        { gardens.map(garden => {
                            return <MenuItem onClick={() => handleSelectedGarden(garden)}>{garden.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <Button color="secondary" onClick={handleCreate}>Submit</Button>
            </Stack>
        </div>
    )
}

export default NewTaskForm