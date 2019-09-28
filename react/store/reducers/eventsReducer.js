import { getEventsRequest } from '../../requests'


const initialState = {
    addEventModel: {
        title: '',
        body: '',
        date: '',
        img: '',
    },
    events: null,
    eventsAreLoading: true,
    errorMessage: '',
}

const APP_NAME = 'EVENTS'

const makeType = type => `${APP_NAME}/${type}`

export const SET_ADD_EVENT_MODEL = makeType('SET_ADD_EVENT_MODAL')
export const SET_EVENTS = makeType('SET_EVENTS')
export const ADD_EVENT = makeType('ADD_EVENT')
export const SET_EVENTS_LOADING = makeType('SET_EVENTS_LOADING')
export const SET_ERROR_MESSAGE = makeType('SET_ERROR_MESSAGE')


export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ADD_EVENT_MODEL: {
            return {
                ...state,
                addEventModel: {
                    ...state.addEventModel,
                    ...action.payload,
                },
            }
        }
        case SET_EVENTS_LOADING: {
            return {
                ...state,
                eventsAreLoading: action.payload,
            }
        }
        case SET_EVENTS: {
            return {
                ...state,
                events: action.payload,
            }
        }
        case ADD_EVENT: {
            return {
                ...state,
                events: [
                    action.payload,
                    ...state.events,
                ],
            }
        }
        case SET_ERROR_MESSAGE: {
            return {
                ...state,
                errorMessage: action.payload,
            }
        }
        default: {
            return state
        }
    }
}

export const setAddEventModel = (model) => ({
    type: SET_ADD_EVENT_MODEL,
    payload: model,
})

export const setEvents = (event) => ({
    type: SET_EVENTS,
    payload: event,
})

export const addEvent = (event) => ({
    type: ADD_EVENT,
    payload: event,
})

export const setLoading = (bool) => ({
    type: SET_EVENTS_LOADING,
    payload: bool,
})

export const reloadEvents = () => dispatch => {
    dispatch(setLoading(true))
    getEventsRequest()
        .then(events => {
            setTimeout(() => {
                dispatch(setEvents(events))
                dispatch(setLoading(false))
            }, 500)
        })
}