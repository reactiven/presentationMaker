import {presentationInfoActions} from "./presentationInfoReducer";
import {saveStateForUndo} from "../Entity/State";
import {saveSlidePreview} from "../common/saveSlidePreview";

function dispatchDecorator(store: any, action: () => void) {
    const {
        presentationInfo,
    } = store.getState()
    saveStateForUndo(presentationInfo)
    store.dispatch(action())

    saveSlidePreview((dataUrl) => {
        const {preview} = store.getState()
        if (!preview.onPreview)
        {
            store.dispatch(presentationInfoActions.setPreviewImage(dataUrl))
        }
    })
}

export {
    dispatchDecorator,
}