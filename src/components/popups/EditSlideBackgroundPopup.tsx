import React, {useContext, useRef, useState} from "react"
import {Popup} from "../common/Popup"
import {Button} from "../common/Button";
import {SlideType} from "../../Entity/types";
import styles from './EditSlideBackgroundPopup.module.css';
import { toDataURL } from "../../common/toDataURL";
import {StoreType} from "../../state/store";
import {StoreContext} from "../../state/storeContext";
import {presentationInfoActions} from "../../state/presentationInfoReducer";
import {popupOpenedReducerActions} from "../../state/popupsOpenedReducers";
import {dispatchDecorator} from "../../state/dispatchDecarator";

type ContentProps = {
    currentSlideInfo: SlideType,
}

function Content(props: ContentProps) {
    const store: Readonly<StoreType> = useContext(StoreContext);

    const [color, setColor] = useState<string>(props.currentSlideInfo.background)
    const inputColorRef = useRef<HTMLInputElement | null>(null)
    const inputFileRef = useRef<HTMLInputElement | null>(null)
    const inputUrlRef = useRef<HTMLInputElement | null>(null)

    function onImageChange(event: any) {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0]
            toDataURL(URL.createObjectURL(img), function(dataUrl: any) {
                dispatchDecorator(store, () => presentationInfoActions.setSlideBackground(dataUrl))
            })
        }
    }

    function onInputColor() {
        if (inputColorRef.current) {
            setColor(inputColorRef.current.value)
            const value = inputColorRef.current.value
            dispatchDecorator(store, () => presentationInfoActions.setSlideBackground(value))
        }
    }

    function insertImageButton() {
        if (inputFileRef.current) {
            inputFileRef.current.click()
        }
    }

    function onInputClick(event: any) {
        event.stopPropagation()
    }

    function findImageUrl(event: any) {
        if (inputUrlRef.current) {
            setColor(inputUrlRef.current.value)
            const value = inputUrlRef.current.value
            dispatchDecorator(store, () => presentationInfoActions.setSlideBackground(value))
        }
    }

    return (
        <div className={styles.contentContainer}>
            <div className={styles.contentRow}>
                <div>Цвет</div>
                <div onClick={onInputClick}>
                    <input
                        type='color'
                        ref={inputColorRef}
                        onInput={onInputColor}
                        defaultValue={color}
                    />
                </div>
            </div>
            <div className={styles.contentRow}>
                <div>Изображение с компьютера</div>
                <div onClick={onInputClick}>
                    <Button
                        type={'normal'}
                        onClick={insertImageButton}
                        label={'Вставить картинку'}
                    />
                    <input
                        type='file'
                        accept=".png, .jpg"
                        ref={inputFileRef}
                        onInput={onImageChange}
                        className={styles.contentFileInput}
                    />
                </div>
            </div>
            <div className={styles.contentRow}>
                <div>Изображение из интернета</div>
                <div onClick={onInputClick}>
                    <input
                        type='text'
                        ref={inputUrlRef}
                        onBlur={findImageUrl}
                        className={styles.contentUrlInput}
                        placeholder={'Введите ссылку на изображение'}
                    />
                </div>
            </div>
        </div>
    )
}

type PropsType = {
    currentSlideInfo: SlideType,
}

function EditSlideBackgroundPopup(props: PropsType) {
    const store: Readonly<StoreType> = useContext(StoreContext);
    function closePopup() {
        store.dispatch(popupOpenedReducerActions.setEditSlideBackgroundPopupOpened(false))
    }

    function acceptChange() {
        store.dispatch(popupOpenedReducerActions.setEditSlideBackgroundPopupOpened(false))
    }

    return (
        <Popup
            headerText={'Фон слайда'}
            content={<Content
                currentSlideInfo={props.currentSlideInfo}
            />}
            acceptButton={<Button
                type={'normal'}
                onClick={acceptChange}
                label={'Применить'}
            />}
            closePopup={closePopup}
        />
    )
}

export {
    EditSlideBackgroundPopup,
}