import React, {forwardRef, Ref} from 'react'
import './Button.css'

type ButtonProps = {
    type: ('normal'|'border-none')
    onClick: () => void,
    label?: string,
    img?: any,
    className?: any,
    disabled?: boolean,
  }

const Button = forwardRef((props: ButtonProps, ref: Ref<HTMLButtonElement>|undefined): JSX.Element =>  {
    const className = `standard-button standard-button_${props.type}`

    function onClick(event: any) {
        props.onClick()
        event.preventDefault()
    }

    return (
        <button
            className={`${props.className ? props.className : ''} ${className} `}
            onClick={onClick}
            disabled={!!props.disabled}
            ref={ref}
        >
            {props.label && props.label}
            {props.img && <img src={props.img} alt='button-logo' className='button-image'/>}
        </button>
    )
})

export {
    Button
}