import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router'
import Navbar from './Navbar'
import MainPage from './MainPage'
import ProfilePage from './ProfilePage'
import { connect } from 'react-redux'

import * as PAGES from '../PAGES'
import RegisterPage from './RegisterPage'
import EventsPage from './EventsPage'

import LoginPage from './LoginPage'
import { reloadProfile } from '../store/reducers/profileReducer'

import connection from '../connection'
import Admin from './Admin';
import { reloadEvents } from '../store/reducers/eventsReducer'
import { reloadMuseums } from '../store/reducers/museumsReducer'

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => {
    return {
        reloadProfile: () => {
            return new Promise((resolve, reject) => {
                dispatch(reloadProfile()).then(resolve).catch(reject)
            })
        },
        reloadEvents: () => {
            dispatch(reloadEvents())
        },
        reloadMuseums: () => {
            dispatch(reloadMuseums())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(({
    reloadProfile,
                                                                 reloadEvents,

}) => {

    useEffect(() => {
        reloadProfile()
        reloadEvents()

        if (localStorage.token) {
            connection.emit('AUTHORIZE', localStorage.loken)
        }
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
                <Route exact path={PAGES.EVENTS_PAGE} component={EventsPage} />
            </Switch>
        </div>
    </React.Fragment>
})
