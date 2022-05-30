import {configureStore} from '@reduxjs/toolkit'
import authOrgReducer from '../features/authOrg/authOrgSlice'

export const store = configureStore({
    reducer: {
        authOrg: authOrgReducer
    }
})