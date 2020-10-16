import { State } from "../Entity/types";


const initialState: State = {
    onPreview: false,
    currentSlide: 2,
    selectedSlideElements: [],
    selectedSlides: [2],
    presentationInfo: {
        name: 'new presentation',
        slidesOrder: [0, 1, 2],
        slides: [
            {
                slideId: 0,
                background: '#000',
                elementsOrder: [],
                elements: []
            },
            {
                slideId: 1,
                background: '#000',
                elementsOrder: [],
                elements: []
            },
            {
                slideId: 2,
                background: '#000',
                elementsOrder: [],
                elements: []
            },
        ],
    }
}

export {
    initialState,
}