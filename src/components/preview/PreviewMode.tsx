import styles from './PreviewMode.module.css';
import React, {useContext} from "react";
import {StoreType} from "../../state/store";
import {StoreContext} from "../../state/storeContext";
import {previewReducerActions} from "../../state/previewReducer";
import {useEventHandler} from "../../common/hooks/useEventHandler";

function PreviewMode() {
    const store: Readonly<StoreType> = useContext(StoreContext);
    debugger
    const {
        presentationInfo,
        preview,
    } = store.getState()
    const currentSlideId = presentationInfo.presentation.slidesOrder[Number(preview.currentSlide)]
    const currentSlideInfo = presentationInfo.presentation.slides[currentSlideId]

    const slideBack = {
        background: `url("${currentSlideInfo.previewImage}") no-repeat center/100% 100%`
    }

    function goToNextSlide() {
        if (preview.currentSlide < presentationInfo.presentation.slidesOrder.length - 1) {
            store.dispatch(previewReducerActions.nextSlide())
        }
    }

    function keydownHandler(event: KeyboardEvent) {
        if (event.keyCode === 39) {
            goToNextSlide()
        }
        if (event.keyCode === 37 && preview.currentSlide > 0) {
            store.dispatch(previewReducerActions.prevSlide())
        }
        if (event.keyCode === 27) {
            store.dispatch(previewReducerActions.setPreviewOpened(false))
        }
    }

    useEventHandler('keydown', document, keydownHandler)

    return(
        <div className={styles.previewContainer} onClick={goToNextSlide}>
            <div className={styles.previewSlideContainer} style={slideBack}>
            </div>
        </div>
    )
}

export {
    PreviewMode,
}