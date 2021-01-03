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

function Popup(props: PropsType) {
    const layerRef = useRef<HTMLDivElement|null>(null)
    const popupRef = useRef<HTMLDivElement|null>(null)

    function layerClick(event: any) {
        if (!event.defaultPrevented) {
            props.closePopup()
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
                    <div className={styles.popupTitle}>{props.headerText}</div>
                    <Button
                        type={'normal'}
                        onClick={props.closePopup}
                        img={close}
                    />
                </div>
                {props.content}
                <div className={styles.popupFooter}>
                    <Button
                        onClick={props.closePopup}
                        label={'Отмена'}
                        type={'normal'}
                    />
                    {props.acceptButton}
                </div>
            </div>
        </div>
    )
}

export {
    Popup,
}