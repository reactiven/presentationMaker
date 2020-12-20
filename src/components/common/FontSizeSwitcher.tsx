import React, {useContext, useEffect, useRef} from "react";
import minus from '../../images/minus.png';
import plus from '../../images/add_new.png';
import './FontSizeSwitcher.css'
import {dispatch} from "../../state/state-manager";
import {changeFont, isTextBox} from "../../Entity/TextBox";
import {TextBoxType} from "../../Entity/types";
import {StoreType} from "../../state/store";
import {StoreContext} from "../../state/storeContext";
import {presentationInfoActions} from "../../state/presentationInfoReducer";

function FontSizeSwitcher() {
    const store: Readonly<StoreType> = useContext(StoreContext);
    const {
        presentationInfo,
        selection,
    } = store.getState()
    const inputRef = useRef<HTMLInputElement>(null)

    const element = presentationInfo.slides[Number(selection.currentSlide)].elements[selection.selectedSlideElements[0]]

    function sizeInc() {
        if (selection.currentSlide && isTextBox(element.dataElement))
        {
            store.dispatch(presentationInfoActions.changeFont(
                selection.currentSlide,
                element.elementId,
                {
                    ...element.dataElement.font,
                    fontSize: Number(element.dataElement.font.fontSize) + 1,
                },
            ))
        }
    }

    function sizeDec() {
        if (selection.currentSlide && isTextBox(element.dataElement))
        {
            store.dispatch(presentationInfoActions.changeFont(
                selection.currentSlide,
                element.elementId,
                {
                    ...element.dataElement.font,
                    fontSize: Number(element.dataElement.font.fontSize) - 1,
                },
            ))
        }
    }

    function onInput() {
        if (inputRef.current && selection.currentSlide && isTextBox(element.dataElement))
        {
            store.dispatch(presentationInfoActions.changeFont(
                selection.currentSlide,
                element.elementId,
                {
                    ...element.dataElement.font,
                    fontSize: Number(inputRef.current.value),
                },
            ))
        }
    }

    useEffect(() => {
        console.log('123')
        if (element && isTextBox(element.dataElement) && inputRef.current) {
            inputRef.current.value = String(element.dataElement.font.fontSize)
        }
    }, [inputRef, element.dataElement])

    return(
        <div className='switcher-container'>
            <button className='switch-button' onClick={sizeDec}>
                <img src={minus} alt='logo' className='switch-image-button'/>
            </button>
            <input
                defaultValue={isTextBox(element.dataElement) ? String(element.dataElement.font.fontSize) : 0}
                className='input-size'
                ref={inputRef}
                onInput={onInput}
            />
            <button className='switch-button' onClick={sizeInc}>
                <img src={plus} alt='logo' className='switch-image-button'/>
            </button>
        </div>
    )
}

export {
    FontSizeSwitcher,
}