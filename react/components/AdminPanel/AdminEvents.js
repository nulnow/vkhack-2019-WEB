import React from 'react'
import { toDateTimeString } from '../../helpers/general';

const AdminEvents = ({

}) => {

    return <section className="content">
        <div className="container">
            <div className="row events-info">
                <div className="col"><h2>Предстоящие</h2></div>
                <div className="col"><p className="counter">16 событий</p></div>
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
            <div className="row event__card">
                <img className="event__img" src="/img/politeh.png" alt />
                <div className="text-content">
                    <h3 className="event__h">"Оборотни" микромира</h3>
                    <p className="date">14 сентября, 16:30</p>
                    <p className="description">На лекции расскажем и покажем вам о том, как образуются нейтрино. А также расскажем о парадоксальных и удивительных результатах экспериментов с участием этих элементарных частиц.</p>
                </div>
                <div className="btn-container"><button className="btn">Подать заявку</button></div>
            </div>
            {/* <div className="row event__card">
                <img className="event__img" src="/img/gulag.png" alt />
                <div className="text-content">
                    <h3 className="event__h">Презентация книги «Сандормох: драматургия смыслов»</h3>
                    <p className="date">3 октября, 19:00</p>
                    <p className="description">Книга о том, как многолетний поиск следов 1111 заключенных Соловецкой тюрьмы особого назначения привел к открытию крупнейшего на Северо-Западе России захоронения расстрелянных жертв Большого террора 1937–1938 годов.</p>
                </div>
                <div className="btn-container"><button className="btn accepted">Заявка подана</button></div>
            </div>
            <div className="row event__card">
                <img className="event__img" src="/img/gallery.png" alt />
                <div className="text-content">
                    <h3 className="event__h">Живопись Киевской Руси ХI века</h3>
                    <p className="date">1 октября, 19:00</p>
                    <p className="description">Лекция посвящена монументальному искусству Киевской Руси, сложившемуся на русской почве под влиянием византийской живописи.</p>
                </div>
                <div className="btn-container"><button className="btn">Подать заявку</button></div>
            </div> */}
        </div>
    </section>

}


export default AdminEvents

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