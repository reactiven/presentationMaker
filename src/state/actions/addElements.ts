import {PresentationType, ShapeTypeType, SlideElementType} from "../../Entity/types";

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
    const slidesOrder = [...state.presentation.slidesOrder]
    slidesOrder.splice(insertPosition + 1, 0, slideId)
    return {
        ...state,
        presentation: {
            ...state.presentation,
            slidesOrder,
            slides: {
                ...state.presentation.slides,
                [slideId]: {
                    slideId,
                    elements: {},
                    elementsOrder: [],
                    background: '#ffffff',
                    previewImage: null,
                }
            }
        },
        selectedSlides: [slideId],
        currentSlide: slideId,
        selectedSlideElements: [],
    }
}

function addElement(state: PresentationType, fn: any, position: ElementPosition, size: ElementSize|undefined, data?: any)
{
    const elementId = generateElementId()
    return {
        ...state,
        presentation: {
            ...state.presentation,
            slides: {
                ...state.presentation.slides,
                [state.currentSlide!]: {
                    ...state.presentation.slides[state.currentSlide!],
                    elements: {
                        ...state.presentation.slides[state.currentSlide!].elements,
                        [elementId]: fn(elementId, position, size, data ? data : undefined)
                    },
                    elementsOrder: [
                        ...state.presentation.slides[state.currentSlide!].elementsOrder,
                        elementId,
                    ]
                }
            }
        },
        selectedSlideElements: [elementId]
    }
}

function addImage(
    imageId: number,
    position: ElementPosition,
    size: ElementSize|undefined,
    data: {
        filepath: string,
    }
): SlideElementType {
    return {
        type: 'image',
        dataElement: {
            src: data.filepath,
        },
        elementId: imageId,
        width: (size && size.w) ||  200,
        height: (size && size.h) ||  200,
        xPos: position.x,
        yPos: position.y,
        background: 'transparent',
        borderWidth: '0',
        borderColor: 'transparent',
    }
}

function addShape(
    shapeId: number,
    position: ElementPosition,
    size: ElementSize|undefined,
    data: {
        type: ShapeTypeType,
    }
): SlideElementType {
    return {
        type: 'shape',
        dataElement: {
            shapeType: data.type,
        },
        elementId: shapeId,
        width: (size && size.w) ||  200,
        height: (size && size.h) ||  200,
        xPos: position.x,
        yPos: position.y,
        background: 'transparent',
        borderWidth: '1',
        borderColor: 'gray',
    }
}

function addTextbox(
    textBoxId: number,
    position: ElementPosition,
    size: ElementSize|undefined
): SlideElementType {
    return {
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
            canEdit: false,
        },
        elementId: textBoxId,
        width: (size && size.w) ||  200,
        height: (size && size.h) ||  200,
        xPos: position.x,
        yPos: position.y,
        background: 'transparent',
        borderWidth: '0',
        borderColor: 'transparent',
    }
}

export {
    addSlide,
    addImage,
    addElement,
    addTextbox,
    addShape,
}