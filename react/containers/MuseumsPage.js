import React from 'react'

export default () => {
    return <section className="content">
        <div className="container">
            <div className="row info">
                <div className="col"><h2>Музеи</h2></div>
                <div className="col"><p className="counter">15 музеев</p></div>
            </div>
            <div className="row m__cards">
                <div className="col-lg-3 col-sm-6">
                    <img className="museum__card" src="/img/politeh_avatar.png" alt=""/>
                    <p className="museum__name">Политех</p>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <img className="museum__card" src="/img/gulag_avatar.png" alt=""/>
                    <p className="museum__name">Музей истории ГУЛАГа</p>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <img className="museum__card" src="/img/gallery_avatar.png" alt=""/>
                    <p className="museum__name">Третьяковская галлерея</p>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <img className="museum__card" src="/img/garage_avatar.png" alt=""/>
                    <p className="museum__name">Музей искусства "Гараж"</p>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <img className="museum__card" src="/img/crcn.png" alt=""/>
                    <p className="museum__name">Музей-заповедник Царицыно</p>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <img className="museum__card" src="/img/gct.png" alt="" />
                    <p className="museum__name">Театральный музей</p>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <img className="museum__card" src="/img/darvin.png" alt=""/>
                    <p className="museum__name">Дарвиновский музей</p>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <img className="museum__card" src="/img/mom.png" alt=""/>
                    <p className="museum__name">Музей искусства "MMOMA"</p>
                </div>
            </div>
        </div>
    </section>
}