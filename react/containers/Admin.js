import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import * as PAGES from '../PAGES'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { preloadUsers } from '../store/reducers/usersReducer';
import AdminUsers from '../components/AdminPanel/AdminUsers'
import AdminEvents from '../components/AdminPanel/AdminEvents'
import AdminRequests from '../components/AdminPanel/AdminRequest';
import { logout } from '../requests';
import { setToken } from '../helpers/general';
import Notification from '../components/Notification'
import NotificationsContainer from './NotificationsContainer'

const mapStateToProps = state => ({
    users: state.users,
    events: state.events,
    requests: state.events.requests
})

export default withRouter(connect(mapStateToProps)(({
    events, requests, users, dispatch, history
}) => {
    const [page, setPage] = useState('users')
    const pages = [
        { page: 'users', title: 'Волонтёры' },
        { page: 'events', title: 'Мероприятия' },
        { page: 'requests', title: 'Заявки' },
    ];

    useEffect(() => {
        dispatch(preloadUsers())
    }, [])

    const onLogoutClick = () => {
        logout()
            .then(res => console.log('kekekekekekekkekekekekekeek'))
        setToken(null)
        history.push('/login')
    }

    return <div>
        <NotificationsContainer />
        <div className="left-nav left-nav--shown" >
            <div className="top-left-nav-wrapper">
                <div className="museum-details">
                    <img src="/img/politeh_avatar.png" alt />
                    <div className="museum-details__texts">
                        <h3>Музей</h3>
                        <p>Какое-то описание</p>
                    </div>
                </div>
            </div>
            <ul className="left-menu">
                {pages.map(p => (
                    <li
                        onClick={() => setPage(p.page)}
                        key={p.page}
                        className={p.page === page ? "left-menu-active" : null}
                    >
                        {p.title}
                    </li>
                ))}
                <hr />
                <li onClick={onLogoutClick}>Выход</li>
            </ul>
        </div>
        {/*-========================== { LEFT NAV END } ====================------*/}
        {(() => {
            switch (page) {
                case 'users':
                    return <AdminUsers {...users} />
                case 'events':
                    return <AdminEvents {...events} />
                case 'requests':
                    return <AdminRequests {...{requests, isLoading: events.eventsAreLoading, dispatch}} />
                default: return null
            }
        })()}
    </div>
}))