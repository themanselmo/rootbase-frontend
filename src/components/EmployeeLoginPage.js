import SideNav from "./SideNav";
import LoginTopNav from "./LoginTopNav";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import NewEmployeeForm from "./NewEmployeeForm";
import { Button, Input, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DirectUpload } from 'activestorage';

const EmployeeLoginPage = ({ currentUser, setCurrentWorker }) => {
    
    const navigate = useNavigate()

    const [creating, setCreating] = useState(false)
    const [employees, setEmployees] = useState([])

    const [open, setOpen] = useState(false)
    const [pin, setPin] = useState('')
    const [currentEID, setCurrentEID] = useState(null)

    useEffect(()=> {
        fetch("/organization_employees")
        .then(r => r.json())
        .then(data => setEmployees(data))
    }, [])

    const handleClickOpen = (EID) => {
        setCurrentEID(EID)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePinSubmit = () => {
        handleLoginEmployee(currentEID)
        handleClose()
    }

    const handleChange = (e) => {
        setPin(e.target.value)
    }

    const listEmployees = (employees) => employees.map((employee) => 
        <div className="employee-card" onClick={() => handleClickOpen(employee.id)}>
            <p>{employee.name}</p>
            <p>{employee.name}@rootbase.com</p>
        </div>
    )

    const handleLoginEmployee = (employee_id) => {
        // const enteredPin = prompt("Please enter your pin")

        const enteredPin = pin;

        const stuff = {id: employee_id, pin: enteredPin}
        const postData = {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(stuff),
        }

        fetch('/login_employee', postData)
        .then(res => {
        if (res.ok) {
            res.json().then((user) => {
            console.log("logging in",user);
            setCurrentWorker(user);
            navigate('/')
            });
        } else {
            res.json().then((errors) => {
            console.log(errors);
            });
        }
        })
    }

    const handleCreateEmployee = (formData) => {
        let newEmployee = {
            name: formData.name,
            pin: formData.pin,
            organization_id: currentUser.id
        }

        const stuff = {
            method: "POST",
             headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(newEmployee),
        }

        fetch("/employees", stuff)
        .then(r => r.json())
        .then(data => {
            setEmployees([...employees, data])
            uploadFile(formData.avatar, data)
        })
    }

    const uploadFile = (file, employee) => {
        const upload = new DirectUpload(file, '/rails/active_storage/direct_uploads')
        upload.create((error, blob) => {
            if(error) {
                console.log(error)
            } else {
                fetch(`/employees/${employee.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({avatar: blob.signed_id})
                })
                .then(res => res.json())
                .then(result => {
                    setCurrentWorker(result)
                })
            }
        })
    }

    const handleCreating = () => {
        setCreating(!creating)
    }

    return (
        <div id="employee-login-page">
            <SideNav />
            <div id="employee-login-content">
                <LoginTopNav currentUser={currentUser} />
                { 
                    creating ? 
                        <NewEmployeeForm handleCreating={handleCreating} handleCreateEmployee={handleCreateEmployee}/>
                    :
                    <div id="employee-list-content">
                        <p>Select your name from the list below</p>
                        <p>Don't see yourself? <Button onClick={handleCreating}>Create</Button> a new employee</p>
                        <div id="employees">
                            {listEmployees(employees)}
                        </div>
                    </div>
                }
                
            </div>
            
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Log In</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    To log in, please enter your pin.
                </DialogContentText>
                <Input
                    autoFocus 
                    onChange={handleChange}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handlePinSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EmployeeLoginPage;
