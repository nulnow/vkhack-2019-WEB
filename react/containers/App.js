import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router'
import Navbar from './Navbar'
import MainPage from './MainPage'
import ProfilePage from './ProfilePage'
import { connect } from 'react-redux'

import * as PAGES from '../PAGES'
import RegisterPage from './RegisterPage'

import LoginPage from './LoginPage'
import { reloadProfile } from '../store/reducers/profileReducer'

import connection from '../connection'
import Admin from './Admin';

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => {
    return {
        reloadProfile: () => {
            return new Promise((resolve, reject) => {
                dispatch(reloadProfile()).then(resolve).catch(reject)
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(({
    reloadProfile,
}) => {

    useEffect(() => {
        reloadProfile()
    }, [])
    if (window.location.pathname === '/admin') {
        return <Admin />
    }

    return <React.Fragment>
        <div className="fake-body">
            <Navbar />
            <Switch>
                <Route exact path={PAGES.HOME_PAGE} component={MainPage} />
                <Route exact path={PAGES.PROFILE_PAGE} component={ProfilePage} />
                <Route exact path={PAGES.LOGIN_PAGE} component={LoginPage} />
                <Route exact path={PAGES.REGISTER_PAGE} component={RegisterPage} />
            </Switch>
        </div>
    </React.Fragment>
})
