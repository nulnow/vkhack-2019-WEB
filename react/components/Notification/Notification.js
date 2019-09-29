import React from 'react'
import {
    notificationContentStyles,
    notificationComponentStyles,
    notificationDeleteButtonStyles,
} from './notificationStyles'


const Notification = ({
                          title = '',
                          description = '',
                          img = '',
                          showDeleteButton = true,
                          onClick = () => { },
                          onDeleteClick = () => { }
                      }) => {

    const onDeleteButtonClick = e => {
        e.preventDefault()
        e.stopPropagation()
        onDeleteClick()
    }

    return <article className={'notification-body'} onClick={onClick} style={notificationComponentStyles}>
        {showDeleteButton && <button className={'close-notification'} onClick={onDeleteButtonClick} style={notificationDeleteButtonStyles}>X</button>}
        {img && <img src={img} alt=""/>}
        <div style={notificationContentStyles}>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    </article>
}

export default Notification