import {useExternalLayer} from "../../../common/hooks/useExternalLayer";
import React, {useContext} from "react";
import {StoreType} from "../../../state/store";
import {StoreContext} from "../../../state/storeContext";
import {AddImageLinkPopup} from "./AddImageLinkPopup";
import {popupOpenedReducerActions} from "../../../state/popupsOpenedReducers";
import {insertionReducerActions} from "../../../state/insertionModeReducer";
import {usePopup} from "../../../common/hooks/usePopup";


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

    usePopup({
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