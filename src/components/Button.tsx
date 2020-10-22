import React from 'react'
import './Button.css'

type ButtonProps = {
    onClick: () => void,
    label: string,
    img: string,
    disabled: boolean,
  }

function Button(props: ButtonProps): JSX.Element {
    return (
        <button className='standard-button' onClick={props.onClick} disabled={props.disabled}  >
           {props.label}
            <img src={props.img} alt='' />
        </button>
    )
}

export {
    Button
}