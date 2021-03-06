import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { reloadProfile, changeProfile } from '../store/reducers/profileReducer'
import Loader from '../components/Loader'
import { Redirect } from 'react-router'
import { setAvatar, updateProfile } from '../requests'


const mapStateToProps = state => {
    const {
        profile: stateProfile,
    } = state

    const {
        profile,
        isLoading,
    } = stateProfile

    return {
        profile,
        isLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        reloadProfile: () => {
            dispatch(reloadProfile())
        },
        changeProfile: (changes) => {
            dispatch(changeProfile(changes))
        }
    }
}


const ProfilePage = ({
                         profile,
                         reloadProfile,
                         isLoading,
                         changeProfile,
                     }) => {
    if (!localStorage['token']) return <Redirect push to={'/login'} />

    const {
        avatar,
        firstName,
        lastName,
        middleName,
        bio,
        events,
        qrcode,
        rating,
    } = profile


    useEffect(() => {
        // reloadProfile()
    }, [])

    const onAvatarClick = () => {
        if (!confirm('Хотите обновить аватар?')) return
        const url = prompt('Вставьте ссылку на ваше фото', '')
        if (!url) return
        updateProfile({ avatar: url })
            .then(() => {
                changeProfile({ avatar: url })
            })
            .catch(() => {
                alert('Произошла ошибка при обновении аватара')
            })
    }

    const onFirstNameClick = () => {
        if (!confirm('Хотите изменить имя?')) return
        const firstName = prompt('Введите новое имя', '')
        if (!firstName) return
        updateProfile({ firstName: firstName })
            .then(() => {
                changeProfile({ firstName: firstName })
            })
            .catch(() => {
                alert('Произошла ошибка при обновении имени')
            })
    }

    const onLastNameClick = () => {
        if (!confirm('Хотите изменить фамилию?')) return
        const lastName = prompt('Введите новое имя', '')
        if (!lastName) return
        updateProfile({ lastName: lastName })
            .then(() => {
                changeProfile({ lastName: lastName })
            })
            .catch(() => {
                alert('Произошла ошибка при обновении имени')
            })
    }

    return <React.Fragment>
        {
            isLoading
                ? <Loader/>
                : <section className="content">
                    <div className="container">
                        <img className="profile__avatar" onClick={onAvatarClick} src={avatar} width="200" height="200" alt="" />
                        <div className="profile__info__container">
                            <h1 className="profile__name">
                                <span onClick={onFirstNameClick}>{ firstName }</span>
                                &nbsp;
                                <span onClick={onLastNameClick}>{ lastName }</span>
                            </h1>
                            <div className="profile__info">
                                <p className="profile__about">{ bio }</p>
                                <div className="row">
                                    <div className="col">
                                        <p className="info__type">Рейтинг</p>
                                    </div>
                                    <div className="col right"><p className="info__type rating">{rating || 0}</p></div>
                                </div>
                                <input type="range" disabled="true" min="0" max="20" value={rating || 0} />
                                <div className="qr-container">
                                    <img className="qr-code" src={qrcode} alt="qrcode"/>
                                </div>
                                <p className="info__type">Образование</p>
                                <p className="info__prop">Студент</p>
                                <p className="info__type">Знание английского</p>
                                <p className="info__prop">B1</p>
                                <p className="info__type">Волонтёрская деятельность</p>
                                <div className="museums">
                                    <p className="info__museum">Политех</p>
                                    <p className="info__museum">Музей истории ГУЛАГа</p>
                                    <p className="info__museum">Третьяковская галлерея</p>
                                    <p className="info__museum">Дарвиновский музей</p>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p className="info__type">Проведённые мероприятия</p>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="show-all" className="info__type events__more">Показать
                                            все</label>
                                    </div>
                                </div>
                                <input type="checkbox" id="show-all"/>
                                <div className="profile__events">
                                    <div className="profile__event">
                                        <h3 className="event__h">Выставка новых музейных экспонатов </h3>
                                        <p className="date">14 сентября</p>
                                    </div>
                                    <div className="profile__event">
                                        <h3 className="event__h">Океан Айвазовского</h3>
                                        <p className="date">9 сентября</p>
                                    </div>
                                    <div className="profile__event">
                                        <h3 className="event__h">Микромир. Маленькая вселенная</h3>
                                        <p className="date">3 сентября</p>
                                    </div>
                                    <div className="profile__event">
                                        <h3 className="event__h">Мероприятие 4</h3>
                                        <p className="date">14 сентября</p>
                                    </div>
                                    <div className="profile__event">
                                        <h3 className="event__h">Мероприятие 5</h3>
                                        <p className="date">14 сентября</p>
                                    </div>
                                    <div className="profile__event">
                                        <h3 className="event__h">Мероприятие 6</h3>
                                        <p className="date">14 сентября</p>
                                    </div>
                                    <div className="profile__event">
                                        <h3 className="event__h">Мероприятие 7</h3>
                                        <p className="date">14 сентября</p>
                                    </div>
                                </div>
                                <p className="info__type">Мобильный номер</p>
                                <p className="info__prop">8 (800) 555-35-35</p>
                            </div>
                        </div>
                    </div>
                </section>
        }
    </React.Fragment>
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)