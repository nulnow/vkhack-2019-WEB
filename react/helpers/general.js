export const setToken = token => {
    if (token) {
        localStorage['token'] = token
    } else {
        localStorage.removeItem('token')
    }
}