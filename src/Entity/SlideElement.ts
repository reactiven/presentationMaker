import { presentation } from "./Presentation";
import { slide } from "./Slide";
import { textBox } from "./TextBox";
import { State } from "./types";

const slideElement = {
    type: 'texBox',
    dataElement: textBox,
    width: 1000,
    height: 1000,
    xPos: 200,
    yPos: 300,
    elementId: 1,
}

function moveElement(state: State, elementId: number, newX: number, newY: number): State {
    const newState = { ...state }
    const slideElement = { ...state.presentationInfo.slides[state.currentSlide].elements}
}
function resizeElement(state: State, newWidth: number, newHeight: number): State {
    const currentSlide = { ...state.presentationInfo.slides[state.currentSlide] }
    const currentElement = { ...currentSlide.elements[state.selectedSlideElements[0]] }
    currentElement.width = newWidth
    currentElement.height = newHeight
    // return {
    //     ...state,
    //     presentationInfo: {
    //         ...state.presentationInfo,
    //         slides: [
    //             ...state.presentationInfo.slides,
    //         ]
    //     }
    // }
}

export {
    slideElement,
}