import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import * as PAGES from '../PAGES'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { preloadUsers } from '../store/reducers/usersReducer';

const mapStateToProps = state => ({
    ...state.users
})

export default connect(mapStateToProps)(({
    isLoading, error, users, dispatch
}) => {
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
                <li className="left-menu-active">Волонтёры</li>
                <li>Мероприятия</li>
                <li>Заявки</li>
                <li>Выход</li>
            </ul>
        </div>
        {/*-========================== { LEFT NAV END } ====================------*/}
        <div className="admin-container">
            <h2>Волонтёры</h2>
            <div id="add-user"><span>+</span></div>
            {users.map(user => {
                return <div className="user__card">
                <div className="row txt-data">
                    <div className="col">
                        <img src={user.avatar || defaultAvatar} alt className="user__avatar" />
                        <p className="user__name">{`${user.firstName} ${user.lastName}`}</p>
                    </div>
                    <div className="col">
                        <p>{user.phone}</p>
                    </div>
                    <div className="col">
                        <p>{user.email}</p>
                    </div>
                    <div className="col">
                        <img src="/img/ban.svg" alt className="edit__user" />
                        <img src="/img/edit.svg" alt className="edit__user" />
                        <button className="btn">Написать</button>
                    </div>
                </div>
            </div>
            })}
        </div>
    </div>
})