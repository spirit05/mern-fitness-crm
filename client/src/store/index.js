import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import alertsReduser from './alert'
import clientReducer from './client'
import coachReduser from './coach'
import exerciseReduser from './exercise'

export default configureStore( {
    reducer: {
        user: userReducer,
        alerts: alertsReduser,
        client: clientReducer,
        coach: coachReduser,
        exercise: exerciseReduser
    }
}); 
