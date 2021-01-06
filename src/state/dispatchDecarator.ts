import * as htmlToImage from "html-to-image";
import {presentationInfoActions} from "./presentationInfoReducer";
import {saveStateForUndo} from "../Entity/State";
import { slideHTML } from "../components/editor/workspace/Slide";

function dispatchDecorator(store: any, action: () => void) {
    const {
        presentationInfo,
    } = store.getState()
    saveStateForUndo(presentationInfo)
    store.dispatch(action())
    const slide = slideHTML
    if (slide) {
        htmlToImage.toJpeg(slide, {
            quality: 1,
        }).then((dataUrl) => {
            const {preview} = store.getState()
            if (!preview.onPreview)
            {
                store.dispatch(presentationInfoActions.setPreviewImage(dataUrl))
            }
        });
    }
}

export {
    dispatchDecorator,
}