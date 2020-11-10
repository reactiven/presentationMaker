import React, {useEffect} from "react";
import {useRef, useState} from "react";
import './Button_WithPopover.css'


type Button_WithPopover = {
    text?: string,
    img?: any,
    popover: any,
}

function Button_WithPopover(props: Button_WithPopover) {
    const [open, setOpen] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)

    const popoverStyle = {
        left: Number(buttonRef.current && buttonRef.current.getBoundingClientRect().left + 10),
        top: Number(buttonRef.current && buttonRef.current.getBoundingClientRect().top + 30),
    }

    function onClick(event: any) {
        event.preventDefault()
        setOpen(!open)
    }

    function onDocumentClick(event: MouseEvent) {
        if (!event.defaultPrevented) {
            setOpen(false)
        }
    }

    function positionPopover() {
        return(
            <div className='popover-container' style={popoverStyle}>
                {props.popover}
            </div>
        )
    }

    useEffect(() => {
        document.addEventListener('click', onDocumentClick)
        return () => document.removeEventListener('click', onDocumentClick)
    })

    return(
        <>
            <button className='button-with-popover' ref={buttonRef} onClick={onClick}>
                {props.img && <img src={props.img} alt='button-logo' className='button-image'/>}
                {props.text}
            </button>
            {open && positionPopover()}
        </>
    )
}

export {
    Button_WithPopover,
}