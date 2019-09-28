import { combineReducers } from 'redux'
import profileReducer from './profileReducer'
import usersReduser from './usersReducer'
export  default combineReducers({
    users: usersReduser,
    profile: profileReducer,
})
