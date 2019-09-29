import io from 'socket.io-client'

import { SOCKET_URL } from '../URLS'
import store from '../store'
import { addNotification } from '../store/reducers/notificationsReducer'

const connection = io(SOCKET_URL)

connection.on('USER_NOTIFY', (message) => {
    console.log('USER_NOTIFY')
    console.log({message})
    store.dispatch(addNotification({
        id: Math.random(),
        title: 'Новое сообщение',
        description: message
    }))
})

export default connection
