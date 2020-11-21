import { State } from "../Entity/types";


const initialState: State = {
    onPreview: false,
    currentSlide: null,
    selectedSlideElements: [],
    selectedSlides: [],
    editSlideBackgroundPopupOpened: false,
    addImageLinkPopupOpened: false,
    presentationInfo: {
        name: 'new presentation',
        slidesOrder: [],
        slides: [],
    }
}

export {
    initialState,
}