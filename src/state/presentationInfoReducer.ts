import {BackgroundType, FontType, PresentationType, ShapeTypeType, SlideType} from "../Entity/types";
import {generateSlideId} from "../Entity/Presentation";
import {generateElementId} from "../Entity/SlideElement";


let initialState = {
    name: 'new presentation',
    slidesOrder: [],
    slides: {},
}
type ElementPosition = {
    x: number,
    y: number
}

type ElementSize = {
    w: number,
    h: number
}

const presentationInfoReducer = (state: PresentationType = initialState, action: ActionTypes): PresentationType => {
    let newState = { ...state }
    switch (action.type) {
        case "CHANGE_NAME":
            newState.name = action.data.newName
            break
        case "SET_SLIDE_BACKGROUND":
            newState.slides[Number(action.data.slideId)].background = action.data.newBackground
            break
        case "ADD_SLIDE":
            let slideId = generateSlideId()
            const insertPosition = newState.slidesOrder.findIndex(slideId => slideId === action.data.currentSlide)
            newState.slidesOrder.splice(insertPosition + 1, 0, slideId)
            newState.slides[slideId] = {
                slideId,
                elements: [],
                elementsOrder: [],
                background: '#ffffff',
                previewImage: null,
            }
            break
        case "DELETE_SLIDES":
            action.data.selectedSlides.forEach((slideId => {
                delete newState.slides[slideId]
            }))
            newState.slidesOrder = newState.slidesOrder.filter(slideId => (action.data.selectedSlides.indexOf(slideId) === -1))
            break
        case "MOVE_SLIDES":
            const selectedSlideId = [...action.data.selectedSlides][0]
            const selectedSlideIndex = newState.slidesOrder.findIndex(id => selectedSlideId === id)
            let finalArray
            if (action.data.newPosition == 0) {
                let newSlidesOrder = newState.slidesOrder.filter(slideId => slideId !== selectedSlideId)
                finalArray = [selectedSlideId].concat(newSlidesOrder)
            }
            else if (action.data.newPosition == newState.slidesOrder.length) {
                let newSlidesOrder = newState.slidesOrder.filter(slideId => slideId !== selectedSlideId)
                finalArray = newSlidesOrder.concat([selectedSlideId])
            }
            else {
                let nextSlideId = newState.slidesOrder[action.data.newPosition]
                newState.slidesOrder.splice(selectedSlideIndex, 1)
                const insertPosition = newState.slidesOrder.findIndex(id => nextSlideId === id)
                const firstPart = newState.slidesOrder.slice(0, insertPosition)
                const secondPart = newState.slidesOrder.slice(insertPosition)
                finalArray = firstPart.concat([selectedSlideId]).concat(secondPart)
            }
            newState.slidesOrder = finalArray
            break
        case "ADD_IMAGE":
            const imageId = generateElementId()
            newState.slides[action.data.slideId].elements[imageId] = {
                type: 'image',
                dataElement: {
                    src: action.data.filepath,
                },
                elementId: generateElementId(),
                width: (action.data.size && action.data.size.w) ||  200,
                height: (action.data.size && action.data.size.h) ||  200,
                xPos: action.data.position.x,
                yPos: action.data.position.y,
                background: null,
                borderWidth: null,
                borderColor: null,
            }
            newState.slides[action.data.slideId].elementsOrder.push(imageId)
            break
        case "ADD_SHAPE":
            const shapeId = generateElementId()
            newState.slides[action.data.slideId].elements[shapeId] = {
                type: 'image',
                dataElement: {
                    shapeType: action.data.type,
                },
                elementId: generateElementId(),
                width: (action.data.size && action.data.size.w) ||  200,
                height: (action.data.size && action.data.size.h) ||  200,
                xPos: action.data.position.x,
                yPos: action.data.position.y,
                background: null,
                borderWidth: null,
                borderColor: null,
            }
            newState.slides[action.data.slideId].elementsOrder.push(shapeId)
            break
        case "ADD_TEXT_BOX":
            const textBox = generateElementId()
            newState.slides[action.data.slideId].elements[textBox] = {
                type: 'image',
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
                elementId: generateElementId(),
                width: (action.data.size && action.data.size.w) ||  200,
                height: (action.data.size && action.data.size.h) ||  200,
                xPos: action.data.position.x,
                yPos: action.data.position.y,
                background: null,
                borderWidth: null,
                borderColor: null,
            }
            newState.slides[action.data.slideId].elementsOrder.push(textBox)
            break
        default:
            break
    }
    return newState;
}

type ActionTypes = ReturnType<PropertiesType<typeof presentationInfoActions>>;

type PropertiesType<T> = T extends { [key: string]: infer U} ? U: never;

const presentationInfoActions = {
    changeName : (newName: string) => {
        return {
            type: 'CHANGE_NAME',
            data: {
                newName,
            }
        } as const
    },
    addSlide: (currentSlide: number) => {
        return {
            type: 'ADD_SLIDE',
            data: {
                currentSlide,
            }
        } as const
    },
    deleteSlides: (selectedSlides: Array<number>) => {
        return {
            type: 'DELETE_SLIDES',
            data: {
                selectedSlides,
            }
        } as const
    },
    moveSlides: (newPosition: number, selectedSlides: Array<number>) => {
        return {
            type: 'MOVE_SLIDES',
            data: {
                newPosition,
                selectedSlides,
            }
        } as const
    },
    addShape: (slideId: number, type: ShapeTypeType, position: ElementPosition, size: ElementSize|undefined) => {
        return {
            type: 'ADD_SHAPE',
            data: {
                slideId,
                type,
                position,
                size,
            }
        } as const
    },
    addImage: (slideId: number, filepath: string, position: ElementPosition, size: ElementSize|undefined) => {
        return {
            type: 'ADD_IMAGE',
            data: {
                slideId,
                filepath,
                position,
                size,
            }
        } as const
    },
    addTextBox: (slideId: number, position: ElementPosition, size: ElementSize|undefined) => {
        return {
            type: 'ADD_TEXT_BOX',
            data: {
                slideId,
                position,
                size,
            }
        } as const
    },
    deleteElements: (selectedElements: Array<number>) => {
        return {
            type: 'DELETE_ELEMENTS',
            data: {
                selectedElements,
            }
        } as const
    },
    setSlideBackground: (slideId: number, newBackground: BackgroundType) => {
        return {
            type: 'SET_SLIDE_BACKGROUND',
            data: {
                slideId,
                newBackground,
            }
        } as const
    },
    setPreviewImage: (image: string) => {
        return {
            type: 'SET_PREVIEW_IMAGE',
            data: {
                image,
            }
        } as const
    },
    moveElement: (elementId: number, newX: number, newY: number) => {
        return {
            type: 'MOVE_ELEMENT',
            data: {
                elementId,
                newX,
                newY,
            }
        } as const
    },
    resizeElement: (newWidth: number, newHeight: number) => {
        return {
            type: 'RESIZE_ELEMENT',
            data: {
                newWidth,
                newHeight,
            }
        } as const
    },
    setBackgroundColor: (newColor: string) => {
        return {
            type: 'SET_BACKGROUND_COLOR',
            data: {
                newColor,
            }
        } as const
    },
    setStrokeColor: (newColor: string) => {
        return {
            type: 'SET_STROKE_COLOR',
            data: {
                newColor,
            }
        } as const
    },
    setStrokeWidth: (newWidth: string) => {
        return {
            type: 'SET_STROKE_WIDTH',
            data: {
                newWidth,
            }
        } as const
    },
    changeFont: (newFont: FontType) => {
        return {
            type: 'CHANGE_FONT',
            data: {
                newFont,
            }
        } as const
    },
    updateTextBox: (text: string) => {
        return {
            type: 'UPDATE_TEXT_BOX',
            data: {
                text,
            }
        } as const
    },
    replaceElementToFront: (elementId: number) => {
        return {
            type: 'REPLACE_ELEMENT_TO_FRONT',
            data: {
                elementId,
            }
        } as const
    }
}

export {
    presentationInfoReducer,
    presentationInfoActions,
}