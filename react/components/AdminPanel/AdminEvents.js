import React, { useState, useEffect } from 'react'
import { toDateTimeString } from '../../helpers/general';
import { API_URL } from '../../URLS'
import { getJson } from '../../helpers/network'


const events = [
    {
        _id: 1, //required
        title: '"Оборотни" микромира', //required
        date: 1569700178944, //required
        description: 'На лекции расскажем и покажем вам о том, как образуются нейтрино. А также расскажем о парадоксальных и удивительных результатах экспериментов с участием этих элементарных частиц.', //required
        userIds: ["5d7e905339343c2ed849b639", "5d7e3fa64b66de1e348c61eb"],
        requestUserIds: [56, 12, 27],
        maximumUsers: 20,
        minimumUsers: 5
    },
    {
        _id: 1, //required
        title: 'Презентация книги «Сандормох: драматургия смыслов»', //required
        date: 1569700178944, //required
        description: 'Книга о том, как многолетний поиск следов 1111 заключенных Соловецкой тюрьмы особого назначения привел к открытию крупнейшего на Северо-Западе России захоронения расстрелянных жертв Большого террора 1937–1938 годов.', //required
        userIds: ["5d7eb2d3a405e132f0347283", "5d7e9a728aa44518d0f09352"],
        requestUserIds: [56, 12, 27],
        maximumUsers: 20,
        minimumUsers: 5
    },
    {
        _id: 1, //required
        title: '"Оборотни" микромира', //required
        date: 1569700178944, //required
        description: 'На лекции расскажем и покажем вам о том, как образуются нейтрино. А также расскажем о парадоксальных и удивительных результатах экспериментов с участием этих элементарных частиц.', //required
        userIds: [],
        requestUserIds: [],
        maximumUsers: 20,
        minimumUsers: 5
    },
    {
        _id: 1, //required
        title: '"Оборотни" микромира', //required
        date: 1569700178944, //required
        description: 'На лекции расскажем и покажем вам о том, как образуются нейтрино. А также расскажем о парадоксальных и удивительных результатах экспериментов с участием этих элементарных частиц.', //required
        userIds: [],
        requestUserIds: [],
        maximumUsers: 20,
        minimumUsers: 5
    }
]

const AdminEvents = ({
    // events
}) => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        getJson(`${API_URL}/admin/events`)
            .then(events => {
                setEvents(events)
            })
    }, [])

    return <section className="content">
        <div className="container">
            <div className="row events-info">
                <div className="col"><h2>Предстоящие</h2></div>
                <div className="col"><p className="counter">{events.length} событий</p></div>
            </div>
            {events.map(event => {
                return <div key={event._id} className="row event__card">
                    <img className="event__img" src="/img/politeh.png" alt />
                    <div className="text-content">
                        <h3 className="event__h">{event.title}</h3>
                        <p className="date">{toDateTimeString(event.date)}</p>
                        <p className="description">На лекции расскажем и покажем вам о том, как образуются нейтрино. А также расскажем о парадоксальных и удивительных результатах экспериментов с участием этих элементарных частиц.</p>
                    </div>
                    <div className="btn-container"><button className="btn">Подать заявку</button></div>
                </div>
            })}
        </div>
    </section>

}


export default AdminEvents
