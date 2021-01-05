import styles from './AddImageLinkPopup.module.css';
import {Popup} from "../common/Popup";
import {Button} from "../common/Button";
import React, {useContext, useRef} from "react";
import {StoreType} from "../../state/store";
import {StoreContext} from "../../state/storeContext";
import {insertionReducerActions} from "../../state/insertionModeReducer";
import {popupOpenedReducerActions} from "../../state/popupsOpenedReducers";
import {useEventHandler} from "../../common/useEventHandler";

type ContentProps = {
    inputInfo: any,
}

function Content({
    inputInfo
}: ContentProps) {
    const inputUrlRef = useRef<HTMLInputElement | null>(null)

    function onInputChange() {
        inputInfo.current.value = inputUrlRef.current!.value
    }
    useEventHandler('change', inputUrlRef, onInputChange)

    return (
        <div className={styles.addImageContentContainer}>
            <div className={styles.addImageContentRow}>
                <div>Ссылка на изображение</div>
                <div>
                    <input
                        type='text'
                        ref={inputUrlRef}
                        defaultValue={inputInfo.current.value}
                    />
                </div>
            </div>
        </div>
    )
}

type PropsType = {
    closePopup: () => void,
    acceptChange: (value: string) => void,
}

function AddImageLinkPopup({
    closePopup,
    acceptChange,
}: PropsType) {
    const inputInfo = useRef<any>({
        value: ''
    })
    return (
        <Popup
            headerText={'Изображение из интернета'}
            content={<Content
                inputInfo={inputInfo}
            />}
            acceptButton={<Button
                type={'normal'}
                onClick={() => acceptChange(inputInfo.current.value)}
                label={'Применить'}
            />}
            closePopup={closePopup}
        />
    )
}

export {
    AddImageLinkPopup,
}