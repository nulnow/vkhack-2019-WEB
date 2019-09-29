import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import * as PAGES from '../PAGES'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { preloadUsers } from '../store/reducers/usersReducer';
import AdminUsers from '../components/AdminPanel/AdminUsers'
import AdminEvents from '../components/AdminPanel/AdminEvents'

const mapStateToProps = state => ({
    ...state.users,
})

export default connect(mapStateToProps)(({
    isLoading, error, users, dispatch
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

    let defaultAvatar = 'https://www.allafricanhits.com/wp-content/uploads/2017/11/user-default-avatar.png'

    return <div>
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
                )
                )}
                <hr />
                <li>Выход</li>
            </ul>
        </div>
        {/*-========================== { LEFT NAV END } ====================------*/}
        {(() => {
            switch (page) {
                case 'users':
                    return <AdminUsers {...{ isLoading, users, error }} />
                case 'events':
                    return <AdminEvents />
            }
        })()}
    </div>
})