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

function addImage(state: PresentationType, filepath: string, position: ElementPosition, size: ElementSize|undefined): PresentationType {
    const imageId = generateElementId()
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
                        [imageId]: {
                            type: 'image',
                            dataElement: {
                                src: filepath,
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
                    },
                    elementsOrder: [
                        ...state.presentation.slides[state.currentSlide!].elementsOrder,
                        imageId,
                    ]
                }
            }
        },
        selectedSlideElements: [imageId]
    }
}

function addShape(state: PresentationType, type: ShapeTypeType, position: ElementPosition, size: ElementSize|undefined): PresentationType {
    const shapeId = generateElementId()
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
                        [shapeId]: {
                            type: 'shape',
                            dataElement: {
                                shapeType: type,
                            },
                            elementId: shapeId,
                            width: (size && size.w) ||  200,
                            height: (size && size.h) ||  200,
                            xPos: position.x,
                            yPos: position.y,
                            background: 'transparent',
                            borderWidth: '1',
                            borderColor: 'gray',
                        },
                    },
                    elementsOrder: [
                        ...state.presentation.slides[state.currentSlide!].elementsOrder,
                        shapeId,
                    ]
                }
            }
        },
        selectedSlideElements: [shapeId]
    }
}

function addTextbox(state: PresentationType, position: ElementPosition, size: ElementSize|undefined): PresentationType {
    const textBoxId = generateElementId()

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
                        [textBoxId]: {
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
                        },
                    },
                    elementsOrder: [
                        ...state.presentation.slides[state.currentSlide!].elementsOrder,
                        textBoxId,
                    ]
                }
            }
        },
        selectedSlideElements: [textBoxId]
    }
}

export {
    addSlide,
    addImage,
    addTextbox,
    addShape,
}