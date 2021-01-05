import React, {useContext, useRef, useState} from "react"
import {Popup} from "../common/Popup"
import {Button} from "../common/Button";
import {SlideType} from "../../Entity/types";
import styles from './EditSlideBackgroundPopup.module.css';
import { toDataURL } from "../../common/toDataURL";
import {StoreType} from "../../state/store";
import {StoreContext} from "../../state/storeContext";
import {presentationInfoActions} from "../../state/presentationInfoReducer";
import {dispatchDecorator} from "../../state/dispatchDecarator";
import {useEventHandler} from "../../common/useEventHandler";

type ContentProps = {
    currentSlideInfo: SlideType,
    setSlideBackground: (value: string) => void,
}

function Content({
    currentSlideInfo,
    setSlideBackground,
}: ContentProps) {
    const [color, setColor] = useState<string>(currentSlideInfo.background)
    const inputColorRef = useRef<HTMLInputElement | null>(null)
    const inputFileRef = useRef<HTMLInputElement | null>(null)
    const inputUrlRef = useRef<HTMLInputElement | null>(null)

    function onImageChange(event: any) {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0]
            toDataURL(URL.createObjectURL(img), function(dataUrl: any) {
                setSlideBackground(dataUrl)
            })
        }
    }

    function onInputColor() {
        if (inputColorRef.current) {
            setColor(inputColorRef.current.value)
            const value = inputColorRef.current.value
            setSlideBackground(value)
        }
    }

    function insertImageButton() {
        if (inputFileRef.current) {
            inputFileRef.current.click()
        }
    }

    function findImageUrl() {
        if (inputUrlRef.current) {
            setColor(inputUrlRef.current.value)
            const value = inputUrlRef.current.value
            setSlideBackground(String(value))
        }
    }

    useEventHandler('blur', inputUrlRef, findImageUrl)
    useEventHandler('input', inputFileRef, onImageChange)
    useEventHandler('input', inputColorRef, onInputColor)

    return (
        <div className={styles.contentContainer}>
            <div className={styles.contentRow}>
                <div>Цвет</div>
                <input
                    type='color'
                    ref={inputColorRef}
                    defaultValue={color}
                />
            </div>
            <div className={styles.contentRow}>
                <div>Изображение с компьютера</div>
                <Button
                    type={'normal'}
                    onClick={insertImageButton}
                    label={'Вставить картинку'}
                />
                <input
                    type='file'
                    accept=".png, .jpg"
                    ref={inputFileRef}
                    className={styles.contentFileInput}
                />
            </div>
            <div className={styles.contentRow}>
                <div>Изображение из интернета</div>
                <input
                    type='text'
                    ref={inputUrlRef}
                    className={styles.contentUrlInput}
                    placeholder={'Введите ссылку на изображение'}
                />
            </div>
        </div>
    )
}

type PropsType = {
    currentSlideInfo: SlideType,
    closePopup: () => void,
    acceptChange: () => void,
    setSlideBackground: (value: string) => void,
}

function EditSlideBackgroundPopup({
    currentSlideInfo,
    closePopup,
    acceptChange,
    setSlideBackground,
}: PropsType) {
    return (
        <Popup
            headerText={'Фон слайда'}
            content={<Content
                currentSlideInfo={currentSlideInfo}
                setSlideBackground={setSlideBackground}
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