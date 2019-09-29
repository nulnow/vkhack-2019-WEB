export const setToken = token => {
    if (token) {
        localStorage['token'] = token
    } else {
        localStorage.removeItem('token')
    }
}

export const toDateTimeString = (timestemp) => {
    let date = new Date(timestemp)
    return `${date.getDate()}.${date.getMonth().toString().padStart(2,0)}.${date.getFullYear()}`
        + ' ' + `${date.getHours().toString().padStart(2,0)}:${date.getMonth().toString().padStart(2,0)}` 

}