import {PresentationType, ShapeTypeType} from "../../Entity/types";

type ElementPosition = {
    x: number,
    y: number
}

type ElementSize = {
    w: number,
    h: number
}

function generateElementId(): number {
    return Date.now()
}

function generateSlideId(): number {
    return Date.now()
}

function addSlide(state: PresentationType): PresentationType {
    let slideId = generateSlideId()
    const insertPosition = state.presentation.slidesOrder.findIndex(slideId => slideId === state.currentSlide)
    state.presentation.slidesOrder.splice(insertPosition + 1, 0, slideId)
    state.presentation.slides[slideId] = {
        slideId,
        elements: {},
        elementsOrder: [],
        background: '#ffffff',
        previewImage: null,
    }
    state.selectedSlides = [slideId]
    state.currentSlide = slideId
    return state
}

function addImage(state: PresentationType, filepath: string, position: ElementPosition, size: ElementSize|undefined): PresentationType {
    if (state.currentSlide)
    {
        const imageId = generateElementId()
        state.presentation.slides[state.currentSlide].elements[imageId] = {
            type: 'image',
            dataElement: {
                src: filepath,
            },
            elementId: imageId,
            width: (size && size.w) ||  200,
            height: (size && size.h) ||  200,
            xPos: position.x,
            yPos: position.y,
            background: null,
            borderWidth: null,
            borderColor: null,
        }
        state.presentation.slides[state.currentSlide].elementsOrder.push(imageId)
        state.selectedSlideElements = [imageId]
    }
    return state
}

function addShape(state: PresentationType, type: ShapeTypeType, position: ElementPosition, size: ElementSize|undefined): PresentationType {
    if (state.currentSlide)
    {
        const shapeId = generateElementId()
        state.presentation.slides[state.currentSlide].elements[shapeId] = {
            type: 'shape',
            dataElement: {
                shapeType: type,
            },
            elementId: shapeId,
            width: (size && size.w) ||  200,
            height: (size && size.h) ||  200,
            xPos: position.x,
            yPos: position.y,
            background: null,
            borderWidth: null,
            borderColor: null,
        }
        state.presentation.slides[state.currentSlide].elementsOrder.push(shapeId)
        state.selectedSlideElements = [shapeId]
    }
    return state
}

function addTextbox(state: PresentationType, position: ElementPosition, size: ElementSize|undefined): PresentationType {
    if (state.currentSlide)
    {
        const textBoxId = generateElementId()
        state.presentation.slides[state.currentSlide].elements[textBoxId] = {
            type: 'textBox',
            dataElement: {
                font: {
                    fontStyle: 'Times New Roman',
                    fontSize: 20,
                    fontColor: '#000000',
                    bold: false,
                    italic: false,
                    underline: false,
                },
                text: '',
            },
            elementId: textBoxId,
            width: (size && size.w) ||  200,
            height: (size && size.h) ||  200,
            xPos: position.x,
            yPos: position.y,
            background: null,
            borderWidth: null,
            borderColor: null,
        }
        state.presentation.slides[state.currentSlide].elementsOrder.push(textBoxId)
        state.selectedSlideElements = [textBoxId]
    }
    return state
}

export {
    addSlide,
    addImage,
    addTextbox,
    addShape,
}