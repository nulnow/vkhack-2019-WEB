import { getProfile } from '../../requests'


const initialState = {
    isLoading: true,
    isLoadingError: false,
    profile: {
        firstName: '',
        lastName: '',
        middleName: '',
        avatar: '',
        bio: '',
        rating: null,
        events: null,
    }
}

const APP_NAME = 'PROFILE'
const makeType = type => `${APP_NAME}/${type}`
export const SET_PROFILE = makeType('SET_PROFILE')
export const CHANGE_PROFILE = makeType('CHANGE_PROFILE')
export const SET_LOADING = makeType('SET_LOADING')
export const SET_LOADING_ERROR = makeType('SET_LOADING_ERROR')

export default (state = initialState, action) => {
    const {
        type,
        payload,
    } = action

    switch (type) {
        case CHANGE_PROFILE: {
            return {
                ...state,
                profile: {
                    ...state.profile,
                    ...payload,
                }
            }
        }
        case SET_PROFILE: {
            return {
                ...state,
                profile: payload,
            }
        }
        case SET_LOADING: {
            return {
                ...state,
                isLoading: payload,
            }
        }
        case SET_LOADING_ERROR: {
            return {
                ...state,
                isLoadingError: payload,
            }
        }
        default: {
            return state
        }
    }
}

export const setLoading = (bool) => ({
    type: SET_LOADING,
    payload: bool,
})

export const setLoadingTrue = () => ({
    type: SET_LOADING,
    payload: true,
})

export const setLoadingFalse = () => ({
    type: SET_LOADING,
    payload: false,
})

export const setLoadingError = (bool) => ({
    type: SET_LOADING_ERROR,
    payload: bool,
})

export const setLoadingErrorTrue = () => ({
    type: SET_LOADING_ERROR,
    payload: true,
})

export const setLoadingErrorFalse = () => ({
    type: SET_LOADING_ERROR,
    payload: false,
})

export const setProfile = (profile) => ({
    type: SET_PROFILE,
    payload: profile,
})

export const changeProfile = (changes) => ({
    type: CHANGE_PROFILE,
    payload: changes,
})

export const reloadProfile = () => dispatch => {
    return new Promise((resolve => {
        dispatch(setLoadingTrue())
        getProfile()
            .then(profile => {
                dispatch(setProfile(profile))
                dispatch(setLoadingFalse())
                dispatch(setLoadingErrorFalse())
                resolve(profile)
            })
            .catch(() => {
                dispatch(setLoadingErrorTrue())
                resolve(null)
            })
    }))
}
