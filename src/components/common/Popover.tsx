import styles from './Popover.module.css'
import React, {useRef} from "react";
import {useEventHandler} from "../../common/hooks/useEventHandler";

type PropsType = {
    style: any,
    content: any,
    closePopover: () => void,
}
function Popover({
    style,
    content,
    closePopover,
}: PropsType) {
    const ref = useRef<HTMLDivElement|null>(null)

    useEventHandler('mousedown', ref, event => event.stopPropagation())
    useEventHandler('click', ref, closePopover)
    return(
        <div
            className={styles.popoverContainer}
            style={style}
            ref={ref}
        >
            {content}
        </div>
    )
}

export {
    Popover,
}