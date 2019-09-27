export const authFetch = (url, params = {}) => {
    const token = localStorage.token
    if (token) {
        return fetch(url + '?mt=' + new Date().getTime(), {
            ...params,
            headers: {
                ...(params.headers ? params.headers : {}),
                Authorization: `Bearer ${token}`,
            }
        })
    } else {
        return fetch(url + '?mt=' + new Date().getTime(), params)
    }
}

export const getJson = (url) => new Promise((resolve, reject) => {
    authFetch(url)
        .then(response => response.json())
        .then(resolve)
        .catch(reject)
})

export const postJson = (url, data) => new Promise((resolve, reject) => {
    authFetch(
        url,
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(data)
        }
    )
        .then(resolve)
        .catch(reject)
})
