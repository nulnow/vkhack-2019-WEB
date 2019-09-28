import { getUsers } from '../../requests'


const initialState = {
    isLoading: true,
    error: false,
    users: []
}

const APP_NAME = 'USERS'
const makeType = type => `${APP_NAME}/${type}`
export const SET_USERS = makeType('SET_USERS')
export const BLOCK_USER = makeType('BLOCK_USER')
export const SET_IS_LOADING = makeType('SET_IS_LOADING')
export const SET_ERROR = makeType('SET_ERROR')

export default (state = initialState, action) => {
    const {
        type,
        payload,
    } = action

    switch (type) {
        case SET_USERS: {
            return {
                ...state,
                users: payload,
            }
        }
        case SET_IS_LOADING: {
            return {
                ...state,
                isLoading: payload,
            }
        }
        case SET_ERROR: {
            return {
                ...state,
                isLoadingError: payload,
            }
        }
        case BLOCK_USER: {
            return {
                ...state
            }
        }
        default: {
            return state
        }
    }
}

export const setIsLoading = (bool) => ({
    type: SET_IS_LOADING,
    payload: bool,
})
export const setError = (errorMsg) => ({
    type: SET_ERROR,
    payload: errorMsg,
})
export const setUsers = (users = []) => ({
    type: SET_USERS,
    payload: users,
})

export const blockUser = (user) => ({
    type: CHANGE_PROFILE,
    payload: user._id,
})

export const preloadUsers = () => dispatch => {
    dispatch(setIsLoading(true))
    getUsers()
        .then(users => {
            dispatch(setUsers(users))
            dispatch(setIsLoading(false))
            dispatch(setError(null))
        })
        .catch(() => {
            dispatch(setError('Произошла ошибка при получении списка волонтеров.'))
        })
}
