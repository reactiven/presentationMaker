import * as htmlToImage from "html-to-image";
import {presentationInfoActions} from "./presentationInfoReducer";
import {saveStateForUndo, stateList} from "../Entity/State";


function dispatchDecorator(store: any, action: () => void) {
    const {
        presentationInfo,
    } = store.getState()
    saveStateForUndo(presentationInfo)
    store.dispatch(action())
    const slide = document.getElementById('slide')
    if (slide) {
        htmlToImage.toJpeg(slide, {
            quality: 0.9,
        }).then((dataUrl) => {
            store.dispatch(presentationInfoActions.setPreviewImage(dataUrl))
        });
    }
}

export {
    dispatchDecorator,
}