import { State } from "../Entity/types";


const initialState: State = {
    currentSlide: null,
    selectedSlideElements: [],
    selectedSlides: [],
    editSlideBackgroundPopupOpened: false,
    addImageLinkPopupOpened: false,
    presentationInfo: {
        name: 'new presentation',
        slidesOrder: [],
        slides: [],
    },
    insertionMode: {
        on: false,
        elementType: null,
    },
    previewInfo: {
        currentSlide: 0,
        onPreview: false,
    }
}

export {
    initialState,
}