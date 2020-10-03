import { slide } from "./Slide";
import { Shape, ShapeColorType, State } from "./types";

const shape: Shape = {
    shapeType: 'circle',
    fillColor: '#123',
    strokeColor: '#4567',
}

function setColor(state: State, newColor: ShapeColorType): State {
    const slides = [...state.presentationInfo.slides]
    const slide = {...slides[state.currentSlide]}
    const elements = [...slide.elements]
    const element = {...elements[state.selectedSlideElements[0]]}
    const dataElement = {...element.dataElement}
    if (isShape(dataElement)){
        dataElement.fillColor = newColor.fillColor
        dataElement.strokeColor = newColor.strokeColor
    }
    element.dataElement = dataElement
    elements[state.selectedSlideElements[0]] = element
    slide.elements = elements
    slides[state.currentSlide] = slide
    return {
        ...state,
        presentationInfo: {
            ...state.presentationInfo,
            slides
        }
    }
}

function isShape(element: any): element is Shape {
    return element.dataElement.shapeType !== undefined && element.dataElement.fillColor !== undefined && element.dataElement.strokeColor !== undefined
}

export {
    shape,
}