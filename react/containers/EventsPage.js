import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Event from '../components/Event'
import { reloadEvents } from '../store/reducers/eventsReducer'
import Button from '../components/Button'
import Loader from '../components/Loader'
import { makeRequestRequest } from '../requests'


const mapStateToProps = state => ({
    events: state.events.events,
    eventsAreLoading: state.events.eventsAreLoading,
})

const mapDispatchToProps = dispatch => ({
    onAddNewsButtonClick: () => {
        dispatch(openAddEventModal())
    },
    reloadEvents: () => {
        dispatch(reloadEvents())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(({
                                                                 events,
                                                                 eventsAreLoading,
                                                                 onAddNewsButtonClick,
                                                                 reloadEvents,
                                                             }) => {

    useEffect(() => {
        // reloadEvents()
    }, [])

    const makeRequest = _id => {
        makeRequestRequest(_id)
            .then(r => {
                reloadEvents()
            })
    }

    return <section className="content">
        <div className="container">
            <div className="row events-info">
                <div className="col"><h2>Предстоящие</h2></div>
                <div className="col"><p className="counter">{events ? `${events.length} событий` : 'Загрузка'}</p></div>
            </div>

            {
                eventsAreLoading
                    ? <Loader/>
                    : events.map((event, i) => <Event {...event} makeRequest={makeRequest} key={i} />)
            }

        </div>
    </section>
})