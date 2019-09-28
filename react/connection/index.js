import io from 'socket.io-client'

import { SOCKET_URL } from '../URLS'

const connection = io(SOCKET_URL)


export default connection
