import {StoreType} from "../../state/store";
import React, {useContext, useEffect} from "react";
import {StoreContext} from "../../state/storeContext";
import {useAddImageLinkPopup} from "../popups/addImageLink/useAddImageLinkPopup";
import {useEditSlideBackgroundPopup} from "../popups/editSlideBackground/useEditSlideBackgroundPopup";
import {dispatchDecorator} from "../../state/dispatchDecarator";
import {presentationInfoActions} from "../../state/presentationInfoReducer";
import {useEventHandler} from "../../common/hooks/useEventHandler";
import styles from "../App.module.css";
import {SideBar} from "./sidebar/Sidebar";
import {Workspace} from "./workspace/Workspace";
import {TopPanel} from "./topPanel/TopPanel";
import { insertionModeReducer, insertionReducerActions } from "../../state/insertionModeReducer";

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
                dispatchDecorator(store, presentationInfoActions.deleteSlides)
            }
            else if (presentationInfo.currentSlide) {
                dispatchDecorator(store, presentationInfoActions.deleteElements)
            }
        }
        if (e.keyCode === 90 && e.ctrlKey) {
            store.dispatch(presentationInfoActions.undo())
        }
        if (e.keyCode === 89 && e.ctrlKey) {
            store.dispatch(presentationInfoActions.redo())
        }
        if (e.keyCode === 67 && e.altKey) {
            store.dispatch(insertionReducerActions.setInsertionMode({
                on: true,
                elementType: 'shape',
                shapeType: 'circle',
            }))
        }
        if (e.keyCode === 82 && e.altKey) {
            store.dispatch(insertionReducerActions.setInsertionMode({
                on: true,
                elementType: 'shape',
                shapeType: 'rect',
            }))
        }
        if (e.keyCode === 73 && e.altKey) {
            store.dispatch(insertionReducerActions.setInsertionMode({
                on: true,
                elementType: 'shape',
                shapeType: 'triangle',
            }))
        }
        if (e.keyCode === 84 && e.altKey) {
            store.dispatch(insertionReducerActions.setInsertionMode({
                on: true,
                elementType: 'textBox',
            }))
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
