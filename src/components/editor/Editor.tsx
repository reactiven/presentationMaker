import {StoreType} from "../../state/store";
import React, {useContext, useEffect} from "react";
import {StoreContext} from "../../state/storeContext";
import {useAddImageLinkPopup} from "../popups/useAddImageLinkPopup";
import {useEditSlideBackgroundPopup} from "../popups/useEditSlideBackgroundPopup";
import {dispatchDecorator} from "../../state/dispatchDecarator";
import {presentationInfoActions} from "../../state/presentationInfoReducer";
import {useEventHandler} from "../../common/useEventHandler";
import styles from "../../App.module.css";
import {TopPanel} from "../topPanel/TopPanel";
import {SideBar} from "../sidebar/Sidebar";
import {Workspace} from "../workspace/Workspace";

function Editor(): JSX.Element {
    const store: Readonly<StoreType> = useContext(StoreContext)
    const {presentationInfo} = store.getState()

    useAddImageLinkPopup()
    useEditSlideBackgroundPopup()

    useEffect(() => {
        document.title = presentationInfo.presentation.name
    }, [presentationInfo])

    const keydownHandler = (e: KeyboardEvent): void => {
        if (e.keyCode === 46) {
            if (!!presentationInfo.selectedSlides.length) {
                dispatchDecorator(store, () => presentationInfoActions.deleteSlides())
            }
            else if (presentationInfo.currentSlide) {
                dispatchDecorator(store, () => presentationInfoActions.deleteElements())
            }
        }
        if (e.keyCode === 90 && e.ctrlKey) {
            store.dispatch(presentationInfoActions.undo())
        }
        if (e.keyCode === 89 && e.ctrlKey) {
            store.dispatch(presentationInfoActions.redo())
        }
    }

    useEventHandler('keydown', document, keydownHandler)

    return (
        <div className={styles.appLayout}>
            <TopPanel />
            <div className={styles.presentationBlock}>
                <SideBar />
                <Workspace />
            </div>
        </div>
    )
}

export {
    Editor,
}
