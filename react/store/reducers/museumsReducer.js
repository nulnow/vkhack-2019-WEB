import { getMuseumsRequest } from '../../requests'


const initialState = {
    museumsAreLoading: true,
    museums: null,
    errorMessage: '',
}

const APP_NAME = 'MUSEUMS'

const makeType = type => `${APP_NAME}/${type}`

export const SET_MUSEUMS = makeType('SET_MUSEUMS')
export const SET_MUSEUMS_LOADING = makeType('SET_MUSEUMS_LOADING')
export const SET_ERROR_MESSAGE = makeType('SET_ERROR_MESSAGE')


export default (state = initialState, action) => {
    switch (action.type) {
        case SET_MUSEUMS_LOADING: {
            return {
                ...state,
                museumsAreLoading: action.payload,
            }
        }
        case SET_MUSEUMS: {
            return {
                ...state,
                museums: action.payload,
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

export const setMuseums = (museums) => ({
    type: SET_MUSEUMS,
    payload: museums,
})

export const setMuseumsLoading = (bool) => ({
    type: SET_MUSEUMS_LOADING,
    payload: bool,
})

export const setMuseumsErrorMessage = (errorMessage) => ({
    type: SET_ERROR_MESSAGE,
    payload: errorMessage,
})

export const reloadMuseums = () => dispatch => {
    dispatch(setMuseumsLoading(true))
    getMuseumsRequest()
        .then(museums => {
            dispatch(setMuseums(museums))
            dispatch(setMuseumsLoading(false))
        })
        .catch(() => {
            dispatch(setMuseums([]))
            dispatch(setMuseumsLoading(false))
            dispatch(setMuseumsErrorMessage('Произошла ошибка при загрузке музеев((('))
        })
}