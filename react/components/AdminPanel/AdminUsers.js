import React, {  useState } from 'react'
import Loader from './../Loader';

const AdminUsers = ({isLoading, users, error}) => {

    const [filter, setFilter] = useState(null)
    
    const handleFilterChange = (e) => {
        setFilter(e.target.value)
    }

    let filteredUsers = filter
        ? users.filter(user => user.firstName.toLowerCase().includes(filter.toLowerCase()) || user.lastName.toLowerCase().includes(filter.toLowerCase()))
        : users

    return <div className="admin-container">
        <h2>Волонтёры</h2>
        <input type="text" onChange={handleFilterChange} className="input-txt" placeholder="Имя, фамилия.." />
        <div id="add-user"><span className="plus">+</span></div>

        {isLoading 
            ? <Loader />
            : filteredUsers.map(user => {
                return <div key={user._id} className="user__card">
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
            })
        }
    </div>
}

export default AdminUsers
