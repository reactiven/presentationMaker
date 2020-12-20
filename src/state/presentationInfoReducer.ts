import {BackgroundType, FontType, PresentationType, ShapeTypeType} from "../Entity/types";
import {generateSlideId} from "../Entity/Presentation";
import {generateElementId} from "../Entity/SlideElement";
import {isTextBox} from "../Entity/TextBox";


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
    let newState: PresentationType = JSON.parse(JSON.stringify(state))
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
                elements: {},
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
                elementId: imageId,
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
                type: 'shape',
                dataElement: {
                    shapeType: action.data.type,
                },
                elementId: shapeId,
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
            const textBoxId = generateElementId()
            newState.slides[action.data.slideId].elements[textBoxId] = {
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
                width: (action.data.size && action.data.size.w) ||  200,
                height: (action.data.size && action.data.size.h) ||  200,
                xPos: action.data.position.x,
                yPos: action.data.position.y,
                background: null,
                borderWidth: null,
                borderColor: null,
            }
            newState.slides[action.data.slideId].elementsOrder.push(textBoxId)
            break
        case "DELETE_ELEMENTS":
            action.data.selectedElements.forEach(elementId => {
                delete newState.slides[action.data.slideId].elements[elementId]
            })
            newState.slides[action.data.slideId].elementsOrder = newState.slides[action.data.slideId].elementsOrder.filter(elementId => {
                const isSelected = action.data.selectedElements.indexOf(elementId) !== -1
                return !isSelected
            })
            break
        case "MOVE_ELEMENT":
            newState.slides[action.data.slideId].elements[action.data.elementId].yPos = action.data.newY
            newState.slides[action.data.slideId].elements[action.data.elementId].xPos = action.data.newX
            break
        case "RESIZE_ELEMENT":
            newState.slides[action.data.slideId].elements[action.data.elementId].width = action.data.newWidth
            newState.slides[action.data.slideId].elements[action.data.elementId].height = action.data.newHeight
            break
        case "SET_BACKGROUND_COLOR":
            newState.slides[action.data.slideId].elements[action.data.elementId].background = action.data.newColor
            break
        case "CHANGE_FONT":
            let changeFontDataElement = newState.slides[action.data.slideId].elements[action.data.elementId].dataElement
            if (isTextBox(changeFontDataElement)) {
                changeFontDataElement.font = {...action.data.newFont}
                newState.slides[action.data.slideId].elements[action.data.elementId].dataElement = changeFontDataElement
            }
            break
        case "SET_STROKE_WIDTH":
            newState.slides[action.data.slideId].elements[action.data.elementId].borderWidth = action.data.newWidth
            break
        case "SET_STROKE_COLOR":
            newState.slides[action.data.slideId].elements[action.data.elementId].borderColor = action.data.newColor
            break
        case "UPDATE_TEXT_BOX":
            let updateCheckboxDataElement = newState.slides[action.data.slideId].elements[action.data.elementId].dataElement
            if (isTextBox(updateCheckboxDataElement)) {
                updateCheckboxDataElement.text = action.data.text
                newState.slides[action.data.slideId].elements[action.data.elementId].dataElement = updateCheckboxDataElement
            }
            break
        case "SET_PREVIEW_IMAGE":
            newState.slides[action.data.slideId].previewImage = action.data.image
            break
        case "REPLACE_ELEMENT_TO_FRONT":
            newState.slides[action.data.slideId].elementsOrder = newState.slides[action.data.slideId].elementsOrder.filter((elementId) => elementId !== action.data.elementId)
            newState.slides[action.data.slideId].elementsOrder.push(action.data.elementId)
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
    deleteElements: (slideId: number, selectedElements: Array<number>) => {
        return {
            type: 'DELETE_ELEMENTS',
            data: {
                selectedElements,
                slideId,
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
    setPreviewImage: (slideId: number, image: string) => {
        return {
            type: 'SET_PREVIEW_IMAGE',
            data: {
                image,
                slideId,
            }
        } as const
    },
    moveElement: (slideId: number, elementId: number, newX: number, newY: number) => {
        return {
            type: 'MOVE_ELEMENT',
            data: {
                slideId,
                elementId,
                newX,
                newY,
            }
        } as const
    },
    resizeElement: (slideId: number, elementId: number, newWidth: number, newHeight: number) => {
        return {
            type: 'RESIZE_ELEMENT',
            data: {
                slideId,
                elementId,
                newWidth,
                newHeight,
            }
        } as const
    },
    setBackgroundColor: (slideId: number, elementId: number, newColor: string) => {
        return {
            type: 'SET_BACKGROUND_COLOR',
            data: {
                slideId,
                elementId,
                newColor,
            }
        } as const
    },
    setStrokeColor: (slideId: number, elementId: number, newColor: string) => {
        return {
            type: 'SET_STROKE_COLOR',
            data: {
                slideId,
                elementId,
                newColor,
            }
        } as const
    },
    setStrokeWidth: (slideId: number, elementId: number, newWidth: string) => {
        return {
            type: 'SET_STROKE_WIDTH',
            data: {
                slideId,
                elementId,
                newWidth,
            }
        } as const
    },
    changeFont: (slideId: number, elementId: number, newFont: FontType) => {
        return {
            type: 'CHANGE_FONT',
            data: {
                slideId,
                elementId,
                newFont,
            }
        } as const
    },
    updateTextBox: (slideId: number, elementId: number, text: string) => {
        return {
            type: 'UPDATE_TEXT_BOX',
            data: {
                slideId,
                elementId,
                text,
            }
        } as const
    },
    replaceElementToFront: (slideId: number, elementId: number) => {
        return {
            type: 'REPLACE_ELEMENT_TO_FRONT',
            data: {
                slideId,
                elementId,
            }
        } as const
    }
}

export {
    presentationInfoReducer,
    presentationInfoActions,
}