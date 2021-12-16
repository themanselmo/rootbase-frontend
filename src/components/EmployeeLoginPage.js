import SideNav from "./SideNav";
import LoginTopNav from "./LoginTopNav";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const EmployeeLoginPage = ({ currentUser, setCurrentWorker }) => {
    
    const navigate = useNavigate()

    const [employees, setEmployees] = useState([])
    useEffect(()=> {
        fetch("/organization_employees")
        .then(r => r.json())
        .then(data => setEmployees(data))
    }, [])

    const listEmployees = (employees) => employees.map((employee) => 
        <div className="employee-card" onClick={() => handleLoginEmployee(employee.id)}>
            <p>{employee.name}</p>
            <p>{employee.name}@rootbase.com</p>
        </div>
    )

    const handleLoginEmployee = (employee_id) => {
        const enteredPin = prompt("Please enter your pin")

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
            console.log(user);
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

    return (
        <div id="employee-login-page">
            <SideNav />
            <div id="employee-login-content">
                <LoginTopNav currentUser={currentUser} />
                <div id="employee-list-content">
                    
                    <p>Select your name from the list below</p>
                    <p>Don't see yourself? <a href="">Create</a> a new employee</p>
                    <div id="employees">
                        {listEmployees(employees)}
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}

export default EmployeeLoginPage;
