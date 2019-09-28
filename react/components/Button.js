
import React from 'react'


const defaultClassName = 'btn'

const Button = (props) => <button
    {...props}
    className={
        props.className
            ? `${props.className} ${defaultClassName}`
            : defaultClassName
    }
>
    { props.children }
</button>

export default Button