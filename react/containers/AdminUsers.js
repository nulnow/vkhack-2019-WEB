import React, { useEffect, useState } from 'react'
import { getJson } from '../helpers/network'
import { getUsers } from '../requests'

const AdminUsers = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers()
            .then(users => {

            })
    }, [])

    return <div className="admin-container">
        <h2>Волонтёры</h2>
        <div id="add-user"><span>+</span></div>
        {users.map(user => {
            return <div className="user__card">
                <div className="row txt-data">
                    <div className="col">
                        <img src={user.avatar || '/img/default_avatar.png'} alt className="user__avatar" />
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
}

export default AdminUsers
