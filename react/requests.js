import {
    EVENTS_URL,
    USERS_URL,
    LOGIN_URL,
    PROFILE_URL,
    REGISTER_URL,
    LOGOUT_URL,
    MUSEUMS_URL,
    MAKE_REQUEST_URL
} from './URLS'
import { getJson, postJson } from './helpers/network'


export const getEventsRequest = () =>
    new Promise(
        (resolve, reject) =>
            getJson(EVENTS_URL)
                .then(resolve)
                .catch(reject))

export const getMuseumsRequest = () =>
    new Promise(
        (resolve, reject) =>
            getJson(MUSEUMS_URL)
                .then(resolve)
                .catch(reject))


export const postEventRequest = event =>
    new Promise(
        (resolve,reject) =>
            postJson(EVENTS_URL, event)
                .then(resolve)
                .then(reject))


export const getProfile = () =>
    new Promise((resolve, reject) =>
        getJson(PROFILE_URL)
            .then(resolve)
            .catch(reject))

export const getUsers = () =>
    new Promise((resolve, reject) =>
        getJson(USERS_URL)
            .then(resolve)
            .catch(reject))

export const register = (model) =>
    new Promise((resolve, reject) =>
        postJson(REGISTER_URL, model)
            .then(response => {
            debugger
                if (response.status === 200) return response.json()

                throw new Error('Не удаётся зарегистрироваться((((((((((')
            })
            .then(resolve)
            .catch(reject))


export const login = (model) =>
    new Promise((resolve, reject) =>
        postJson(LOGIN_URL, model)
            .then(response => {
                if (response.status === 200) return response.json()

                throw new Error('Неправильный логин или пароль')
            })
            .then(resolve)
            .catch(reject))

export const logout = () =>
    new Promise((resolve, reject) =>
        postJson(LOGOUT_URL, {t: Math.random()})
            .then(response => {
                if (response.status === 200) return response.json()
                throw new Error('На сервере произошла ошибка при выходе из аккаунта')
            })
            .then(resolve)
            .catch(reject))

export const updateProfile = (model) =>
    new Promise((resolve, reject) =>
        postJson(PROFILE_URL, model)
            .then(response => {
                if (response.status === 200) return response.json()
                throw new Error('Не удалось обновить профиль')
            })
            .then(resolve)
            .catch(reject))

export const makeRequestRequest = (_id) =>
    new Promise((resolve, reject) => {
        getJson(MAKE_REQUEST_URL + '/' + _id)
            .then(resolve)
            .catch(reject)
    })