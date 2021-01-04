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

const Button = forwardRef((
    {
        type,
        onClick,
        label,
        img,
        className,
        disabled,
    }: ButtonProps,
    ref: Ref<HTMLButtonElement>|undefined,
): JSX.Element =>  {
    const commonStyle = `standard-button standard-button_${type}`

    function handleOnClick(event: any) {
        onClick()
        event.preventDefault()
    }

    return (
        <button
            className={`${className ? className : ''} ${commonStyle} `}
            onClick={handleOnClick}
            disabled={!!disabled}
            ref={ref}
        >
            {label}
            {img && <img src={img} alt='button-logo' className='button-image'/>}
        </button>
    )
})

export {
    Button,
}