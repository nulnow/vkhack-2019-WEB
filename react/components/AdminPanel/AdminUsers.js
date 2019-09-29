import React, { useState } from 'react'
import Loader from './../Loader'
import connection from '../../connection'
import { register } from '../../requests'

const getEmptyUser = () => ({
    firstName: '',
    lastName: '',
    email: '',
    passport: '',
    password: '',
    avatar: '',
})

const AdminUsers = ({ isLoading, users, error }) => {

    const [filter, setFilter] = useState(null)

    const [isAddUserModalOpen, setAddUserModalOpen] = useState(false)
    const [isEditUserModalOpen, setEditUserModalOpen] = useState(false)

    const [newUser, setNewUser] = useState(getEmptyUser())
    const [editUser, setEditUser] = useState({})

    const updateNewUser = (changes) => {
        setNewUser({
            ...newUser,
            ...changes,
        })
    }

    const updateNewUserField = field => e => {
        updateNewUser({
            [field]: e.target.value
        })
    }

    const updateEditUser = (changes) => {
        setEditUser({
            ...editUser,
            ...changes,
        })
    }

    const updateEditUserField = field => e => {
        updateEditUser({
            [field]: e.target.value
        })
    }

    const handleFilterChange = (e) => {
        setFilter(e.target.value)
    }

    const registerUser = () => {
        if (!Object.values(newUser).every(x => x)) {
            console.log({newUser})
            return alert('Заполнены не все поля')
        }
        register(newUser)
        setAddUserModalOpen(false)
        setNewUser(getEmptyUser())
    }

    const updateUser = () => {

    }

    const openAddUserModal = () => {
        setAddUserModalOpen(true)
    }
    const closeAddUserModal = (e) => {
        if (e.target.classList.contains('pop-up')) {
            setAddUserModalOpen(false)
        }
    }

    const openEditUserModal = (user) => {
        setEditUser(user)
        setEditUserModalOpen(true)
    }

    const closeEditUserModal = (e) => {
        if (e.target.classList.contains('pop-up')) {
            setEditUser({})
            setEditUserModalOpen(false)
        }
    }

    let filteredUsers = filter
        ? (users || []).filter(user => user.firstName.toLowerCase()
            .includes(filter.toLowerCase()) || user.lastName.toLowerCase()
            .includes(filter.toLowerCase()))
        : users

    return <React.Fragment>
        {
            isAddUserModalOpen && <div className="pop-up" onClick={closeAddUserModal}>
                <div className="send-message">
                    <h3>Регистрация волонтёра</h3>
                    <input type="text" value={newUser.firstName} onChange={updateNewUserField('firstName')} className="input-txt" placeholder="Имя"/>
                    <input type="text" value={newUser.lastName} onChange={updateNewUserField('lastName')} className="input-txt" placeholder="Фамилия"/>
                    <input type="text"  value={newUser.passport} onChange={updateNewUserField('passport')}  className="input-txt" placeholder="Паспорт"/>
                    <input type="e-mail" value={newUser.email} onChange={updateNewUserField('email')} className="input-txt" placeholder="E-mail"/>
                    <input type="password" value={newUser.password} onChange={updateNewUserField('password')} className="input-txt" placeholder="Пароль"/>
                    <input type="text" value={newUser.avatar} onChange={updateNewUserField('avatar')}  className="input-txt" placeholder="Url фото"/>
                    <button onClick={registerUser} className="btn">Отправить</button>
                </div>
            </div>
        }

        {
            isEditUserModalOpen && <div className="pop-up" onClick={closeEditUserModal}>
                <div className="send-message">
                    <h3>Редактирование профиля волонтёра</h3>
                    <input type="text" value={editUser.firstName} onChange={updateEditUserField('firstName')} className="input-txt" placeholder="Имя"/>
                    <input type="text" value={editUser.lastName} onChange={updateEditUserField('lastName')} className="input-txt" placeholder="Фамилия"/>
                    <input type="text"  value={editUser.passport} onChange={updateEditUserField('passport')}  className="input-txt" placeholder="Паспорт"/>
                    <input type="e-mail" value={editUser.email} onChange={updateEditUserField('email')} className="input-txt" placeholder="E-mail"/>
                    {/*<input type="password" value={editUser.password} onChange={updateEditUserField('password')} className="input-txt" placeholder="Пароль"/>*/}
                    <input type="text" value={editUser.avatar} onChange={updateEditUserField('avatar')}  className="input-txt" placeholder="Url фото"/>
                    <button onClick={updateUser} className="btn">Сохранить</button>
                </div>
            </div>
        }
        <div className="admin-container">



            <h2>Волонтёры</h2>

            <div className="input-txt fake-select"><select className="hide-select">
                <option>Пункт 1</option>
                <option>Пункт 2</option>
            </select></div>

            <div id="add-user" onClick={ openAddUserModal }><span className="plus">+</span></div>


            { isLoading
                ? <Loader/>
                : (filteredUsers || []).map(user => {
                    return <div key={ user._id } className="user__card">
                        <div className="row txt-data">
                            <div className="col">
                                <img src={ user.avatar || '/img/default_avatar.png' } alt className="user__avatar"/>
                                <p className="user__name">{ `${ user.firstName } ${ user.lastName }` }</p>
                            </div>
                            <div className="col">
                                <p>{ user.phone }</p>
                            </div>
                            <div className="col">
                                <p>{ user.email }</p>
                            </div>
                            <div className="col">
                                {!user.isBlocked && <img src="/img/ban.svg"  alt className="edit__user"/>}
                                <img src="/img/edit.svg" onClick={() => openEditUserModal(user)} alt className="edit__user"/>
                                <button className="btn" onClick={ () => {
                                    let message = prompt('Введите сообщение')
                                    connection.emit('SEND_MESSAGE', {
                                        email: user.email,
                                        message,
                                    })
                                } }>Написать
                                </button>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
        </React.Fragment>

}

export default AdminUsers
