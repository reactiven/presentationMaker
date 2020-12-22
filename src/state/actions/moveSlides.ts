import {PresentationType} from "../../Entity/types";


function moveSlides(state: PresentationType, newPosition: number): PresentationType {
    const selectedSlideId = [...state.selectedSlides][0]
    const selectedSlideIndex = state.presentation.slidesOrder.findIndex(id => selectedSlideId === id)
    let finalArray
    if (newPosition == 0) {
        let newSlidesOrder = state.presentation.slidesOrder.filter(slideId => slideId !== selectedSlideId)
        finalArray = [selectedSlideId].concat(newSlidesOrder)
    }
    else if (newPosition == state.presentation.slidesOrder.length) {
        let newSlidesOrder = state.presentation.slidesOrder.filter(slideId => slideId !== selectedSlideId)
        finalArray = newSlidesOrder.concat([selectedSlideId])
    }
    else {
        let nextSlideId = state.presentation.slidesOrder[newPosition]
        state.presentation.slidesOrder.splice(selectedSlideIndex, 1)
        const insertPosition = state.presentation.slidesOrder.findIndex(id => nextSlideId === id)
        const firstPart = state.presentation.slidesOrder.slice(0, insertPosition)
        const secondPart = state.presentation.slidesOrder.slice(insertPosition)
        finalArray = firstPart.concat([selectedSlideId]).concat(secondPart)
    }
    state.presentation.slidesOrder = [...finalArray]

    return state
}

export {
    moveSlides,
}