import { FontType, State, TextBox } from "./types";

const textBox: TextBox = {
    font: {
        fontStyle: 'Times New Roman',
        fontSize: '2px',
        bold: true,
        italic: true,
    },
    text: 'text',
}

function changeFont(state: State, newFont: FontType): State{
    const slides = [...state.presentationInfo.slides]
    const slide = {...slides[state.currentSlide]}
    const elements = [...slide.elements]
    const element = {...elements[state.selectedSlideElements[0]]}
    const dataElement = {...element.dataElement}
    if (isTextBox(dataElement)){
        dataElement.font = {...newFont}
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
function updateTextBox(state: State, text: string): State{
    const slides = [...state.presentationInfo.slides]
    const slide = {...slides[state.currentSlide]}
    const elements = [...slide.elements]
    const element = {...elements[state.selectedSlideElements[0]]}
    const dataElement = {...element.dataElement}
    if (isTextBox(dataElement)){
        dataElement.text = text
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

function isTextBox(element: any): element is TextBox {
    return element.dataElement.font !== undefined
}

export {
    textBox,
}