import React, { useState } from 'react'
import { register } from '../requests'
import { setToken } from '../helpers/general'
import { Redirect } from 'react-router'


const RegisterPage = ({

                      }) => {
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ passwordConfirmation, setPasswordConfirmation ] = useState('')

    const [ errorMessage, setErrorMessage ] = useState('')

    const [ redirectUrl, setRedirectUrl ] = useState('')

    const {
        onFirstNameChange,
        onLastNameChange,
        onEmailChange,
        onPasswordChange,
        onPasswordConfirmationChange,
    } = {
        onFirstNameChange: e => setFirstName(e.target.value),
        onLastNameChange: e => setLastName(e.target.value),
        onEmailChange: e => setEmail(e.target.value),
        onPasswordChange: e => setPassword(e.target.value),
        onPasswordConfirmationChange: e => setPasswordConfirmation(e.target.value),
    }

    const onRegisterButtonClick = () => {
        register({
            firstName,
            lastName,
            email,
            password,
        }).then().then(token => {
            setToken(token)
            setRedirectUrl('/profile')
        }).catch(err => {
            if (err && err.message) setErrorMessage(err.message)
        })
    }

    if (redirectUrl) return <Redirect push to={redirectUrl} />

    return <div className={'register-page'}>
        <div className="register-form">
            {
                errorMessage && <p style={{color: 'red'}}>{ errorMessage }</p>
            }
            <div className="auth-logo-container">
                <img src="" alt="" className="auth-logo"/>
            </div>
            <div className="auth-fom-group">
                <input className={'input'} type="text" value={firstName} onChange={onFirstNameChange} placeholder={'Введите ваше имя'}/>
            </div>
            <div className="auth-fom-group">
                <input className={'input'} type="text" value={lastName} onChange={onLastNameChange} placeholder={'Введите вашу фамилию'}/>
            </div>
            <div className="auth-form-group">
                <input className={'input'} type="email" value={email} onChange={onEmailChange} placeholder={'Введите ваш Email'}/>
            </div>
            <div className="auth-form-group">
                <input className={'input'} type="password" value={password} onChange={onPasswordChange} placeholder={'Введите ваш пароль'}/>
            </div>
            <div className="auth-form-group">
                <input className={'input'} type="password" value={passwordConfirmation} onChange={onPasswordConfirmationChange} placeholder={'Повторите ваш пароль'}/>
            </div>
            <div className="auth-form-group">
                <button className={'btn btn--fullsize'} onClick={onRegisterButtonClick}>Зарегистрироваться</button>
            </div>
        </div>
    </div>
}

export default RegisterPage