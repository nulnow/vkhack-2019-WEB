import React from 'react'
import Button from './Button'


export default ({
                    _id = '',
                    title = '',
                    description = '',
                    img = null,
                    startDate = '',
                    endDate = '',
                    museum = '',
                    makeRequest = null,
                    isRequested = false,
                    isAccepted = false,
                }) => {

    return <div className="row event__card">
        <img className="event__img" src={img || "/img/politeh.png"} alt="" />
        <div className="text-content">
            <h3 className="event__h">{ title }</h3>
            <p className="date">{ startDate }</p>
            <p className="description">{ description }</p>
        </div>
        <div className="btn-container">
            <button className="btn" disabled={isRequested} onClick={() => {
                makeRequest(_id)
            }}>
                {
                    isAccepted
                        ? 'Одобрена'
                        : (
                            isRequested ? 'Заявка подана' : 'Подать заявку'
                        )
                }
            </button>
        </div>
    </div>
}
