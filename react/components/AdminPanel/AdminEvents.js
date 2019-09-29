import React, { useState, useEffect } from 'react'
import { toDateTimeString } from '../../helpers/general';
import { API_URL } from '../../URLS'
import { getJson } from '../../helpers/network'
import Loader from '../Loader';

const AdminEvents = ({
    events, eventsAreLoading, errorMessage
}) => {
    // const [events, setEvents] = useState([])

    // useEffect(() => {
    //     getJson(`${API_URL}/admin/events`)
    //         .then(events => {
    //             setEvents(events)
    //         })
    // }, [])

    return <div className="admin-container">
    <section className="content">
        <div className="container">
            <div className="row events-info">
                <div className="col"><h2>Предстоящие</h2></div>
                <div className="col">
                    <p className="counter">
                    {eventsAreLoading ? 'Загрузка...' : `Событий: ${events.length}`}
                    </p>
                    </div>
            </div>
            {eventsAreLoading
                ? <Loader />
                : events.map(event => {
                    return <div key={event._id} className="row event__card">
                        <img className="event__img" src="/img/politeh.png" alt />
                        <div className="text-content">
                            <h3 className="event__h">{event.title}</h3>
                            <p className="date">{toDateTimeString(event.date)}</p>
                            <p className="description">На лекции расскажем и покажем вам о том, как образуются нейтрино. А также расскажем о парадоксальных и удивительных результатах экспериментов с участием этих элементарных частиц.</p>
                        </div>
                        {/*<div className="btn-container"><button className="btn">Подать заявку</button></div>*/}
                    </div>
                })
            }
        </div>
    </section>
    </div>

}


export default AdminEvents
