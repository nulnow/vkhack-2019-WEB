import React, { useState } from 'react'
import { NavLink  } from 'react-router-dom'
import * as PAGES from '../PAGES'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'


export default connect((state) => {
    return ({
        profile: state.profile,
    })
})(withRouter(({ history, profile }) => {

    const onLogoutClick = () => {

    }

    return <section className="nav">
        <div className="container">
            <div className="row header">
                <div className="col"></div>
                <div className="col">
                    <h1 className="logo">Волонтёр.рф</h1>
                </div>
                <div className="col avatar-container">
                    {
                        localStorage.token && <React.Fragment>
                            <img src={profile.profile.avatar} className="avatar" alt={''} width="40px" height="40px" />
                            <div className={'avatar-after'} onClick={onLogoutClick} title={'Выход'}>
                                <i className="fas fa-sign-out-alt"/>
                            </div>
                        </React.Fragment>
                    }
                </div>
            </div>
            <div className="nav__fixed">
                <div className="row menu">
                    <div className="col">
                        <NavLink exact className={'menu-element'} activeClassName={'menu-element active'}  to={PAGES.EVENTS_PAGE}>
                            События
                        </NavLink >
                    </div>
                    <div className="col">
                        <NavLink exact className={'menu-element'} activeClassName={'menu-element active'}  to={'/museums'}>
                            Музеи
                        </NavLink >
                    </div>
                    <div className="col">
                        <NavLink exact className={'menu-element'} activeClassName={'menu-element active'}  to={'/ы'}>
                            ы
                        </NavLink >
                    </div>
                    <div className="col">
                        {
                            localStorage.token
                                ? <NavLink exact className={'menu-element profile'} activeClassName={'menu-element profile active'}  to={PAGES.PROFILE_PAGE}>
                                    Профиль
                                </NavLink >
                                : <NavLink exact className={'menu-element'} activeClassName={'menu-element active'}  to={PAGES.LOGIN_PAGE}>
                                    Вход
                                </NavLink >
                        }

                    </div>
                </div>
            </div>
        </div>
    </section>
}))