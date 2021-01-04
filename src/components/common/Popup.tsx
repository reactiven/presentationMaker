import React, {useRef} from "react";
import { Button } from "./Button";
import close from '../../images/close.png';

import styles from './Popup.module.css'

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
    const layerRef = useRef<HTMLDivElement|null>(null)
    const popupRef = useRef<HTMLDivElement|null>(null)

    function layerClick(event: any) {
        if (!event.defaultPrevented) {
            closePopup()
        }
    }

    function popupClick(event: any) {
        if (!event.defaultPrevented) {
            event.preventDefault()
        }
    }

    return(
        <div className={styles.popupLayer} ref={layerRef} onClick={layerClick}>
            <div className={styles.popupContainer} ref={popupRef} onClick={popupClick}>
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