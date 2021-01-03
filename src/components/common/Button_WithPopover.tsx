import React, {useEffect} from "react";
import {useRef, useState} from "react";
import styles from './Button_WithPopover.module.css'
import {Button} from "./Button";


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

    function onClick() {
        setOpen(!open)
    }

    function onDocumentClick(event: MouseEvent) {
        if (!event.defaultPrevented) {
            setOpen(false)
        }
    }

    function positionPopover() {
        return(
            <div className={styles.popoverContainer} style={popoverStyle}>
                {props.popover}
            </div>
        )
    }

    useEffect(() => {
        document.addEventListener('click', onDocumentClick)
        return () => document.removeEventListener('click', onDocumentClick)
    })

    return(
        <div>
            <Button
                type={"border-none"}
                onClick={onClick}
                label={props.text}
                img={props.img}
                ref={buttonRef}
            />
            {open && positionPopover()}
        </div>
    )
}

export {
    Button_WithPopover,
}