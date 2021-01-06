import styles from './Popover.module.css'
import React, {RefObject, useMemo, useRef} from "react";
import {useEventHandler} from "../../common/hooks/useEventHandler";

type PropsType = {
    control: RefObject<any>,
    content: any,
    closePopover: () => void,
}
function Popover({
    control,
    content,
    closePopover,
}: PropsType) {
    const ref = useRef<HTMLDivElement|null>(null)
    const popoverLayerRef = useRef<HTMLDivElement|null>(null)

    useEventHandler('mousedown', ref, event => event.stopPropagation())
    useEventHandler('click', ref, closePopover)
    useEventHandler('mousedown', popoverLayerRef, closePopover)

    const popoverStyle = useMemo(() => ({
        left: Number(control.current && control.current.getBoundingClientRect().left + 10),
        top: Number(control.current && control.current.getBoundingClientRect().top + 30),
    }), [control])

    return(
        <div className={styles.popoverLayer} ref={popoverLayerRef}>
            <div
                className={styles.popoverContainer}
                style={popoverStyle}
                ref={ref}
            >
                {content}
            </div>
        </div>
    )
}

export {
    Popover,
}