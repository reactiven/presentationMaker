import React, {useContext, useEffect, useRef} from "react";
import minus from '../../images/minus.png';
import plus from '../../images/add_new.png';
import './FontSizeSwitcher.css'
import {StoreType} from "../../state/store";
import {StoreContext} from "../../state/storeContext";
import {presentationInfoActions} from "../../state/presentationInfoReducer";

type PropsType = {
    fontSize: number,
}

function FontSizeSwitcher(props: PropsType) {
    const store: Readonly<StoreType> = useContext(StoreContext);
    const inputRef = useRef<HTMLInputElement>(null)

    function sizeInc() {
        store.dispatch(presentationInfoActions.incFontSize())
    }

    function sizeDec() {
        store.dispatch(presentationInfoActions.decFontSize())
    }

    function onInput() {
        if (inputRef.current)
        {
            store.dispatch(presentationInfoActions.changeFontSize(Number(inputRef.current.value)))
        }
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = props.fontSize ? String(props.fontSize) : ''
        }
    }, [props.fontSize])

    return(
        <div className='switcher-container'>
            <button className='switch-button' onClick={sizeDec}>
                <img src={minus} alt='logo' className='switch-image-button'/>
            </button>
            <input
                defaultValue={props.fontSize ? props.fontSize : ''}
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