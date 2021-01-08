import {popupOpenedReducerActions} from "../../../state/popupsOpenedReducers";
import React, {useContext} from "react";
import {StoreType} from "../../../state/store";
import {StoreContext} from "../../../state/storeContext";
import {EditSlideBackgroundPopup} from "./EditSlideBackgroundPopup";
import {SlideType} from "../../../Entity/types";
import {dispatchDecorator} from "../../../state/dispatchDecarator";
import {presentationInfoActions} from "../../../state/presentationInfoReducer";
import {usePopup} from "../../../common/hooks/usePopup";


function useEditSlideBackgroundPopup() {
    const store: Readonly<StoreType> = useContext(StoreContext);
    const {
        presentationInfo,
        popupsOpened: {
            editSlideBackgroundPopupOpened,
        },
    } = store.getState()

    const currentSlideInfo = presentationInfo.currentSlide
        ? presentationInfo.presentation.slides[presentationInfo.currentSlide]
        : null

    function closePopup() {
        store.dispatch(popupOpenedReducerActions.setEditSlideBackgroundPopupOpened(false))
    }

    function acceptChange() {
        store.dispatch(popupOpenedReducerActions.setEditSlideBackgroundPopupOpened(false))
    }

    function changeBackground(value: string) {
        dispatchDecorator(store, () => presentationInfoActions.setSlideBackground(value))
    }

    usePopup({
        binding: <EditSlideBackgroundPopup
            currentSlideInfo={currentSlideInfo as SlideType}
            acceptChange={acceptChange}
            closePopup={closePopup}
            setSlideBackground={changeBackground}
        />,
        show: editSlideBackgroundPopupOpened && !!currentSlideInfo,
        close: closePopup
    })
}

export {
    useEditSlideBackgroundPopup,
}