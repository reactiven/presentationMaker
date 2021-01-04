import React, {useContext, useEffect, useRef} from "react";
import minus from '../../images/minus.png';
import plus from '../../images/add_new.png';
import styles from './FontSizeSwitcher.module.css'
import {StoreType} from "../../state/store";
import {StoreContext} from "../../state/storeContext";
import {presentationInfoActions} from "../../state/presentationInfoReducer";
import {dispatchDecorator} from "../../state/dispatchDecarator";
import {Button} from "./Button";

type PropsType = {
    fontSize: number,
}

function FontSizeSwitcher({
    fontSize,
}: PropsType) {
    const store: Readonly<StoreType> = useContext(StoreContext);
    const inputRef = useRef<HTMLInputElement>(null)

    function sizeInc() {
        dispatchDecorator(store, () => presentationInfoActions.incFontSize())
    }

    function sizeDec() {
        dispatchDecorator(store, () => presentationInfoActions.decFontSize())
    }

    function onInput() {
        if (inputRef.current)
        {
            const value = inputRef.current.value
            dispatchDecorator(store, () => presentationInfoActions.changeFontSize(Number(value)))
        }
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = fontSize ? String(fontSize) : ''
        }
    }, [fontSize])

    return(
        <div className={styles.switcherContainer}>
            <Button
                type={"border-none"}
                onClick={sizeDec}
                img={minus}
            />
            <input
                defaultValue={fontSize ? fontSize : ''}
                className={styles.inputSize}
                ref={inputRef}
                onInput={onInput}
            />
            <Button
                type={"border-none"}
                onClick={sizeInc}
                img={plus}
            />
        </div>
    )
}

export {
    FontSizeSwitcher,
}