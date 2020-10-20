import React from 'react'
import { ButtonProps } from '../Entity/types'



function Button(props: ButtonProps): JSX.Element {
    return (
        <button className='standard-button' onClick={props.onClick}>
           {props.label}
            <img src={props.img} alt='' />
        </button>
    )
}

export {
    Button
}