
// 176.119.159.40
export const API_URL = 'http://176.119.159.40:8888/api'
export const SOCKET_URL = 'http://176.119.159.40:8888/'

export const buildApiUrl = url => `${API_URL}/${url}`

export const EVENTS_URL = buildApiUrl('events')
export const PROFILE_URL = buildApiUrl('profile')
export const USERS_URL = buildApiUrl('users')
export const REGISTER_URL = buildApiUrl('register')
export const LOGIN_URL = buildApiUrl('login')
export const LOGOUT_URL = buildApiUrl('logout')
export const MUSEUMS_URL = buildApiUrl('museums')
