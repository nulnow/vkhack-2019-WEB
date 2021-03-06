import { combineReducers } from 'redux'
import eventsReducer from './eventsReducer'
import profileReducer from './profileReducer'
import notificationsReducer from './notificationsReducer'
import museumsReducer from './museumsReducer'
import usersReducer from './usersReducer'

export  default combineReducers({
    events: eventsReducer,
    profile: profileReducer,
    notifications: notificationsReducer,
    museums: museumsReducer,
    users: usersReducer,
})
