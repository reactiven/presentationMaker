import styles from './Popover.module.css'
import React from "react";

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
    return(
        <div
            className={styles.popoverLayer}
            onMouseDown={event => !event.defaultPrevented && closePopover()}
        >
            <div
                className={styles.popoverContainer}
                style={style}
                onClick={closePopover}
                onMouseDown={event => event.preventDefault()}
            >
                {content}
            </div>
        </div>
    )
}

export {
    Popover,
}