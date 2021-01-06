import React, {useRef} from "react";
import { Button } from "./Button";
import close from '../../images/close.png';

import styles from './Popup.module.css'
import {useEventHandler} from "../../common/hooks/useEventHandler";
import {preventDefault} from "../../common/preventDefault";

type PropsType = {
    headerText: string,
    content: any,
    acceptButton: any,
    closePopup: () => void,
}

function Popup({
    closePopup,
    acceptButton,
    headerText,
    content,
}: PropsType) {
    const popupRef = useRef<HTMLDivElement|null>(null)
    const popupLayerRef = useRef<HTMLDivElement|null>(null)

    function popupMouseDown(event: any) {
        event.stopPropagation()
    }

    useEventHandler('mousedown', popupRef, popupMouseDown)
    useEventHandler('mousedown', popupLayerRef, closePopup)

    return(
        <div ref={popupLayerRef} className={styles.popupLayer}>
            <div className={styles.popupContainer} ref={popupRef}>
                <div className={styles.popupHeader}>
                    <div className={styles.popupTitle}>{headerText}</div>
                    <Button
                        type={'border-none'}
                        onClick={closePopup}
                        img={close}
                    />
                </div>
                {content}
                <div className={styles.popupFooter}>
                    <Button
                        onClick={closePopup}
                        label={'Отмена'}
                        type={'normal'}
                    />
                    {acceptButton}
                </div>
            </div>
        </div>
    )
}

export {
    Popup,
}