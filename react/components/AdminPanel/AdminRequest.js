import React from 'react'

const AdminRequests = ({
    isLoading, requests
}) => {

    const handleFilterChange = () => { }

    return <div className="admin-container">
        <h2>Заявки</h2>

        <input type="text" onChange={handleFilterChange} className="input-txt" placeholder="Поиск..." />
        <div id="add-user"><span className="plus">+</span></div>

        {isLoading
            ? <Loader />
            : (requests || []).map(request => {
                return <div key={request._id} className="user__card">
                    <div className="row txt-data">
                        <div className="col">
                            <img src={request.avatar || '/img/default_avatar.png'} alt className="user__avatar" />
                            <p className="user__name">{`${request.firstName} ${request.lastName}`}</p>
                        </div>
                        <div className="col" >
                            <p style={{ color: 'black' }}>{`${request.event.title}`}</p>
                        </div>
                        <div className="col">
                            <button className="btn" style={{ backgroundColor: '#28a745', marginRight: 10 }} onClick={() => { }}>
                                Принять
                                </button>
                            <button className="btn" style={{ backgroundColor: '#dc3545' }} onClick={() => { }}>
                                Отклонить
                            </button>
                        </div>
                    </div>
                </div>
            })
        }
    </div>
}


export default AdminRequests