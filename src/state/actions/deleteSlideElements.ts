import {PresentationType} from "../../Entity/types";


function deleteSlideElements(state: PresentationType): PresentationType {
    if (state.currentSlide)
    {
        const slides = {...state.presentation.slides}
        const slide = {...state.presentation.slides[Number(state.currentSlide)]}
        const elements = {...slide.elements}
        const elementsOrder = [...slide.elementsOrder]
        state.selectedSlideElements.forEach(elementId => {
            delete elements[elementId]
        })

        slide.elements = elements
        slide.elementsOrder = elementsOrder.filter(elementId => {
            const isSelected = state.selectedSlideElements.indexOf(elementId) !== -1
            return !isSelected
        })

        slides[Number(state.currentSlide)] = slide

        return {
            ...state,
            presentation: {
                ...state.presentation,
                slides,
            },
            selectedSlideElements: [],
        }
    }
    return state
}

export {
    deleteSlideElements,
}