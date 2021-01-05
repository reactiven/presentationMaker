import {useExternalLayer} from "../../common/useExternalLayer";
import {useContext} from "react";
import {StoreType} from "../../state/store";
import {StoreContext} from "../../state/storeContext";
import {Popup} from "../common/Popup";
import React from "react";
import { AddImageLinkPopup } from "./AddImageLinkPopup";
import {popupOpenedReducerActions} from "../../state/popupsOpenedReducers";
import {insertionReducerActions} from "../../state/insertionModeReducer";


function useAddImageLinkPopup() {
    const store: Readonly<StoreType> = useContext(StoreContext);
    const open = store.getState().popupsOpened.addImageLinkPopupOpened

    function closePopup() {
        store.dispatch(popupOpenedReducerActions.setAddImageLinkPopupOpened(false))
    }

    function acceptChange(value: string) {
        store.dispatch(insertionReducerActions.setInsertionMode({
            on: true,
            elementType: 'image',
            filepath: value
        }))
        store.dispatch(popupOpenedReducerActions.setAddImageLinkPopupOpened(false))
    }

    useExternalLayer({
        layerType: 'popup',
        binding: <AddImageLinkPopup
            closePopup={closePopup}
            acceptChange={acceptChange}
        />,
        show: open,
        close: closePopup,
    })
}

export {
    useAddImageLinkPopup,
}