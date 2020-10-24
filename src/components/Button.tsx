import React from 'react'
import './Button.css'

type ButtonProps = {
    onClick: () => void,
    label?: string,
    img?: any,
    disabled?: boolean,
  }

function Button(props: ButtonProps): JSX.Element {
    return (
        <button className='standard-button' onClick={props.onClick} disabled={!!props.disabled}>
            {props.label && props.label}
            {props.img && <img src={props.img} alt='button-logo'  className='button-image'/>}
        </button>
    )
}

export {
    Button
}