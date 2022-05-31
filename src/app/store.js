import {configureStore} from '@reduxjs/toolkit'
import authOrgReducer from '../features/authOrg/authOrgSlice'
import authEmpReducer from '../features/authEmp/authEmpSlice'
import orgEmployeesReducer from '../features/orgEmployees/orgEmployeesSlice'
import gardenReducer from '../features/garden/gardenSlice'
import taskReducer from '../features/task/taskSlice'
import commentReducer from '../features/comment/commentSlice'

export const store = configureStore({
    reducer: {
        authOrg: authOrgReducer,
        authEmp: authEmpReducer,
        orgEmployees: orgEmployeesReducer,
        gardens: gardenReducer,
        tasks: taskReducer,
        comments: commentReducer
    }
})