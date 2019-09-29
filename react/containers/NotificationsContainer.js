import React from 'react'
import { connect } from 'react-redux'
import Notification from '../components/Notification'
import { removeAllNotifications, removeNotification } from '../store/reducers/notificationsReducer'

const notificationsComponentStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: 150,
    display: 'flex',
    flexFlow: 'column nowrap',
}

const mapStateToProps = (state => {
    return {
        notifications: state.notifications.notifications
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
        removeNotification: (notification) => {
            dispatch(removeNotification(notification))
        },
        removeAllNotifications: () => {
            dispatch(removeAllNotifications())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(({
                                                                 notifications,
                                                                 removeNotification,
                                                                 removeAllNotifications,
                                                             }) => {

    return <div style={notificationsComponentStyles}>
        {
            !!notifications && notifications
                .map((notification, i) => <Notification
                    key={i}
                    {...notification}
                    onDeleteClick={() => removeNotification(notification)}
                />)
        }
    </div>
})