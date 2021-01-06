import React, {useMemo} from "react";
import {useRef, useState} from "react";
import {Button} from "./Button";
import {Popover} from "./Popover";
import {useExternalLayer} from "../../common/hooks/useExternalLayer";


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

    const popoverStyle = useMemo(() => ({
        left: Number(buttonRef.current && buttonRef.current.getBoundingClientRect().left + 10),
        top: Number(buttonRef.current && buttonRef.current.getBoundingClientRect().top + 30),
    }), [buttonRef.current])

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

    return <Button
        type={"border-none"}
        onClick={() => setOpen(!open)}
        label={text}
        img={img}
        ref={buttonRef}
    />
}



export {
    Button_WithPopover,
}