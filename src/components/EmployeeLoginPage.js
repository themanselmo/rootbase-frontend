import SideNav from "./SideNav";
import LoginTopNav from "./LoginTopNav";
import { useEffect, useState } from "react";

const EmployeeLoginPage = ({ currentUser }) => {
    
    const [employees, setEmployees] = useState([])
    useEffect(()=> {
        fetch("/organization_employees")
        .then(r => r.json())
        .then(data => setEmployees(data))
    }, [])

    const listEmployees = (employees) => employees.map((employee) => 
        <div className="employee-card">
            <p>{employee.name}</p>
            <p>{employee.name}@rootbase.com</p>
        </div>
    )

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
