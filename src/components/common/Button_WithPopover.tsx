import React, {useRef, useState} from "react";
import {usePopover} from "../../common/hooks/usePopover";
import {Button} from "./Button";

type Button_WithPopover = {
    text?: string,
    img?: any,
    popoverContent: any,
    tooltipText?: string,
}

function Button_WithPopover({
    text,
    img,
    popoverContent,
    tooltipText,
}: Button_WithPopover) {
    const [show, setShow] = useState(false)
    const buttonRef = useRef<HTMLDivElement>(null)

    usePopover({
        elementRef: buttonRef,
        content: popoverContent,
        show,
        setShow,
    })

    return(
        <div ref={buttonRef}>
            <Button
                type={"border-none"}
                onClick={() => setShow(true)}
                label={text}
                img={img}
                tooltipText={tooltipText}
            />
        </div>
    )
}



export {
    Button_WithPopover,
}