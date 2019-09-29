import React from 'react'
import { Redirect } from 'react-router'
import { login } from '../requests'
import { setToken } from '../helpers/general'
import { reloadProfile } from '../store/reducers/profileReducer'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import connection from '../connection'

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            redirectUrl: null,
            errorMessage: '',
        }
    }

    onLoginClick = () => {
        login({
            email: this.state.email,
            password: this.state.password,
        })
            .then(response => {
                setToken(response)
                connection.emit('AUTHORIZE', {token: response})
                this.props.reloadProfile()
                this.setState({ redirectUrl: '/profile' })
            })
            .catch(err => {
                this.setState({ errorMessage: err })
            })
    }

    render() {
        if (this.state.redirectUrl) {
            return <Redirect push to={ this.state.redirectUrl }/>
        }

        return <div id={ 'login__bg' } style={{zIndex: 2, position: 'fixed', top: 0}}>
            <div style={{
                position: 'fixed',
                top: 50,
                left: 50,
            }}><Link to={'/'} style={{color: 'white'}}>На сайт</Link></div>
            <div className="login__window">
                <div className="left__wing">
                    <h1>Волонтёр.рф</h1>
                    <div action="" className="login__form">
                        <input type="text" name="email" value={ this.state.email } id="email" onChange={ e => {
                            this.setState({ email: e.target.value })
                        } } className="custom__input" autoComplete="off" required/>
                        <label className="lbl" htmlFor="email">E-mail</label>
                        <input required type="password" name="password" value={ this.state.password } id="password"
                               className="custom__input"
                               autoComplete="off" onChange={ e => this.setState({ password: e.target.value }) }/>
                        <label className="lbl" htmlFor="password">Пароль</label>
                        <button className="btn white__btn" onClick={this.onLoginClick}>Вход</button>
                        <Link to={'/register'} className="register__btn">Регистрация</Link>
                    </div>
                </div>
            </div>
        </div>

        return <div>
            <h1>Вход</h1>
            <div>
                <input type="email" placeholder={ 'Введите email' }/>
            </div>
            <div>
                <input type="password"
                       placeholder={ 'Введите пароль' }/>
            </div>
            <button onClick={ this.onLoginClick }>Вход</button>
        </div>
    }
}


export default connect(null, (dispatch) => {
    return ({
        reloadProfile: () => dispatch(reloadProfile()),
        addNotification: (notification) => {
            dispatch(addNotification(notification))
        },
    })
})(LoginPage)