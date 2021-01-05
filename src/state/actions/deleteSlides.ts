import {PresentationType} from "../../Entity/types";

function deleteSlides(state: PresentationType): PresentationType {
    const slides = {...state.presentation.slides}

    state.selectedSlides.forEach((slideId => {
        delete slides[slideId]
    }))

    return {
        ...state,
        presentation: {
            ...state.presentation,
            slides,
            slidesOrder: state.presentation.slidesOrder.filter(slideId => (state.selectedSlides.indexOf(slideId) === -1))
        },
        selectedSlides: [],
        currentSlide: null,
    }
}

export {
    deleteSlides,
}