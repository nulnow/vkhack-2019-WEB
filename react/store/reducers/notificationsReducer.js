const mockNotifications = [
    {
        id: '123321',
        title: 'Регистрация прошла успешно!',
        description: 'Удачного волонтёрства :)))',
    },
    {
        id: '3212131',
        title: 'Политехнический музей организует выставку',
    }
]

const initialState = {
    notifications: [
        //...mockNotifications
    ]
}

const APP_NAME = 'NOTIFICATIONS'
const makeType = type => `${APP_NAME}/${type}`
export const ADD_NOTIFICATION = makeType('ADD_NOTIFICATION')
export const REMOVE_NOTIFICATION = makeType('REMOVE_NOTIFICATION')
export const REMOVE_ALL_NOTIFICATIONS = makeType('REMOVE_ALL_NOTIFICATIONS')

export default (state = initialState, action) => {
    const {
        type,
        payload,
    } = action

    switch (type) {
        case ADD_NOTIFICATION: {
            console.log('NOTIFICATION')
            console.log(payload)
            return {
                ...state,
                notifications: state.notifications.concat([payload])
            }
        }
        case REMOVE_NOTIFICATION: {
            return {
                ...state,
                notifications: state.notifications.filter(notification => notification !== action.payload)
            }
        }
        case REMOVE_ALL_NOTIFICATIONS: {
            return {
                ...state,
                notifications: [],
            }
        }
        default: {
            return state
        }
    }
}

export const addNotification = notification => ({
    type: ADD_NOTIFICATION,
    payload: notification,
})

export const removeNotification = notification => ({
    type: REMOVE_NOTIFICATION,
    payload: notification,
})

export const removeAllNotifications = () => ({
    type: REMOVE_ALL_NOTIFICATIONS,
})