import React, {useRef} from 'react'
import styles from './Button.module.css'
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
    let typeStyle
    switch (type) {
        case "border-none":
            typeStyle = styles.standardButtonBorderNone
            break
        case "normal":
            typeStyle = styles.standardButtonNormal
            break
        default:
            typeStyle = ''
    }

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
            className={`${styles.standardButton} ${className || ''} ${typeStyle} `}
            disabled={!!disabled}
            ref={buttonRef}
        >
            {label}
            {img && <img src={img} alt='button-logo' className={styles.buttonImage}/>}
        </button>
    )
}

export {
    Button,
}