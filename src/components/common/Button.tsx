import React from 'react'
import './Button.css'

type ButtonProps = {
    type: ('normal'|'border-none')
    onClick: () => void,
    label?: string,
    img?: any,
    disabled?: boolean,
  }

function Button(props: ButtonProps): JSX.Element {
    const className = `standard-button standard-button_${props.type}`
    return (
        <button className={className} onClick={props.onClick} disabled={!!props.disabled}>
            {props.label && props.label}
            {props.img && <img src={props.img} alt='button-logo'  className='button-image'/>}
        </button>
    )
}

export {
    Button
}