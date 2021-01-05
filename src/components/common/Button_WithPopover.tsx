import React from "react";
import {useRef, useState} from "react";
import {Button} from "./Button";
import {Popover} from "./Popover";
import {useExternalLayer} from "../../common/useExternalLayer";


type Button_WithPopover = {
    text?: string,
    img?: any,
    popoverContent: any,
}

function Button_WithPopover({
    text,
    img,
    popoverContent,
}: Button_WithPopover) {
    const [open, setOpen] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)

    const popoverStyle = {
        left: Number(buttonRef.current && buttonRef.current.getBoundingClientRect().left + 10),
        top: Number(buttonRef.current && buttonRef.current.getBoundingClientRect().top + 30),
    }

    useExternalLayer({
        layerType: 'popover',
        binding: <Popover
            style={popoverStyle}
            content={popoverContent}
            closePopover={() => setOpen(false)}
        />,
        show: open,
        close: () => setOpen(false)
    })

    return(
        <div>
            <Button
                type={"border-none"}
                onClick={() => setOpen(!open)}
                label={text}
                img={img}
                ref={buttonRef}
            />
        </div>
    )
}



export {
    Button_WithPopover,
}