import React, {forwardRef, Ref, useRef} from 'react'
import './Button.css'
import {useTooltip} from "../../common/hooks/useTooltip";
import {useEventHandler} from "../../common/hooks/useEventHandler";

type ButtonProps = {
    type: ('normal'|'border-none')
    onClick: () => void,
    label?: string,
    img?: any,
    className?: any,
    disabled?: boolean,
    tooltipText?: string,
  }

function Button({
    type,
    onClick,
    label,
    img,
    className,
    disabled,
    tooltipText,
}: ButtonProps): JSX.Element  {
    const commonStyle = `standard-button standard-button_${type}`
    const buttonRef = useRef<HTMLButtonElement|null>(null)

    useTooltip({
        elementRef: buttonRef,
        showTooltip: !!tooltipText,
        text: tooltipText || '',
    })

    function handleOnClick(event: any) {
        onClick()
        event.preventDefault()
    }

    useEventHandler('click', buttonRef, handleOnClick)

    return (
        <button
            className={`${className ? className : ''} ${commonStyle} `}
            disabled={!!disabled}
            ref={buttonRef}
        >
            {label}
            {img && <img src={img} alt='button-logo' className='button-image'/>}
        </button>
    )
}

export {
    Button,
}