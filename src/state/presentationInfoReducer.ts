import {BackgroundType, FontType, PresentationType, ShapeTypeType} from "../Entity/types";
import {isTextBox} from "../Entity/TextBox";
import {addImage, addShape, addSlide, addTextbox} from "./actions/addElements";
import { moveSlides } from "./actions/moveSlides";


let initialState: PresentationType = {
    currentSlide: null as null|number,
    selectedSlideElements: [] as Array<number>,
    selectedSlides: [] as Array<number>,
    presentation: {
        name: 'new presentation',
        slidesOrder: [],
        slides: {},
    },
}
type ElementPosition = {
    x: number,
    y: number
}

type ElementSize = {
    w: number,
    h: number
}


if (localStorage.getItem("state") !== null) {
    let storageState: PresentationType = JSON.parse(String(localStorage.getItem("state")))
    initialState = {...storageState}
}

const presentationInfoReducer = (state: PresentationType = initialState, action: ActionTypes): PresentationType => {
    let newState: PresentationType = {...state}
    switch (action.type) {
        case "CHANGE_NAME":
            newState.presentation.name = action.data.newName
            break
        case "SET_SLIDE_BACKGROUND":
            if (newState.currentSlide)
            {
                newState.presentation.slides[newState.currentSlide].background = action.data.newBackground
            }
            break
        case "ADD_SLIDE":
            newState = addSlide(newState)
            break
        case "DELETE_SLIDES":
            newState.selectedSlides.forEach((slideId => {
                delete newState.presentation.slides[slideId]
            }))
            newState.presentation.slidesOrder = newState.presentation.slidesOrder.filter(slideId => (state.selectedSlides.indexOf(slideId) === -1))
            break
        case "MOVE_SLIDES":
            newState = moveSlides(newState, action.data.newPosition)
            break
        case "ADD_IMAGE":
            newState = addImage(newState, action.data.filepath, action.data.position, action.data.size)
            break
        case "ADD_SHAPE":
            newState = addShape(newState, action.data.type, action.data.position, action.data.size)
            break
        case "ADD_TEXT_BOX":
            newState = addTextbox(newState, action.data.position, action.data.size)
            break
        case "DELETE_ELEMENTS":
            if (newState.currentSlide)
            {
                newState.selectedSlideElements.forEach(elementId => {
                    delete newState.presentation.slides[Number(newState.currentSlide)].elements[elementId]
                })
                newState.presentation.slides[newState.currentSlide].elementsOrder = newState.presentation.slides[newState.currentSlide].elementsOrder.filter(elementId => {
                    const isSelected = newState.selectedSlideElements.indexOf(elementId) !== -1
                    return !isSelected
                })
            }
            break
        case "MOVE_ELEMENT":
            if (state.currentSlide)
            {
                newState.presentation.slides[state.currentSlide].elements[action.data.elementId].yPos = action.data.newY
                newState.presentation.slides[state.currentSlide].elements[action.data.elementId].xPos = action.data.newX
            }
            break
        case "RESIZE_ELEMENT":
            if (state.currentSlide)
            {
                newState.presentation.slides[state.currentSlide].elements[action.data.elementId].width = action.data.newWidth
                newState.presentation.slides[state.currentSlide].elements[action.data.elementId].height = action.data.newHeight
            }
            break
        case "SET_BACKGROUND_COLOR":
            if (state.currentSlide)
            {
                newState.selectedSlideElements.forEach(elementId => {
                    const type = newState.presentation.slides[Number(state.currentSlide)].elements[elementId].type
                    if (type != 'image')
                    {
                        newState.presentation.slides[Number(state.currentSlide)].elements[elementId].background = action.data.newColor
                    }
                })
            }
            break
        case "CHANGE_FONT":
            if (state.currentSlide)
            {
                newState.selectedSlideElements.forEach(elementId => {
                    const dataElement = newState.presentation.slides[Number(state.currentSlide)].elements[elementId].dataElement
                    if (isTextBox(dataElement)) {
                        dataElement.font = {...action.data.newFont}
                        newState.presentation.slides[Number(state.currentSlide)].elements[elementId].dataElement = dataElement
                    }
                })
            }
            break
        case "SET_STROKE_WIDTH":
            if (state.currentSlide)
            {
                newState.selectedSlideElements.forEach(elementId => {
                    newState.presentation.slides[Number(newState.currentSlide)].elements[elementId].borderWidth = action.data.newWidth
                })
            }
            break
        case "SET_STROKE_COLOR":
            if (state.currentSlide)
            {
                newState.selectedSlideElements.forEach(elementId => {
                    newState.presentation.slides[Number(newState.currentSlide)].elements[elementId].borderColor = action.data.newColor
                })
            }
            break
        case "UPDATE_TEXT_BOX":
            if (state.currentSlide)
            {
                const dataElement = newState.presentation.slides[state.currentSlide].elements[state.selectedSlideElements[0]].dataElement
                if (isTextBox(dataElement)) {
                    dataElement.text = action.data.text
                    newState.presentation.slides[state.currentSlide].elements[state.selectedSlideElements[0]].dataElement = dataElement
                }
            }
            break
        case "SET_PREVIEW_IMAGE":
            if (newState.currentSlide)
            {
                newState.presentation.slides[newState.currentSlide].previewImage = action.data.image
            }
            break
        case "REPLACE_ELEMENT_TO_FRONT":
            if (newState.currentSlide)
            {
                const elementsOrder = [...newState.presentation.slides[newState.currentSlide].elementsOrder]
                newState.presentation.slides[newState.currentSlide].elementsOrder = elementsOrder.filter((elementId) => elementId !== action.data.elementId)
                newState.presentation.slides[newState.currentSlide].elementsOrder.push(action.data.elementId)
            }
            break
        case "SELECT_SLIDE":
            newState.currentSlide = action.data.slideId
            newState.selectedSlideElements = []
            newState.selectedSlides = [action.data.slideId]
            break
        case "ADD_ELEMENT_TO_SELECTED":
            newState.selectedSlideElements.push(action.data.elementId)
            break
        case "SELECT_ELEMENT":
            newState.selectedSlideElements = [action.data.elementId]
            break
        case "ADD_SLIDE_TO_SELECTED":
            const selectedSlides = [...state.selectedSlides]
            let newSelectedSlides = [...selectedSlides]
            let newCurrentSlide
            if (!!selectedSlides.find(slide => slide === action.data.slideId)) {
                newSelectedSlides = selectedSlides.filter(slide => slide !== action.data.slideId)
                newCurrentSlide = newSelectedSlides[newSelectedSlides.length - 1]
            }
            else {
                newSelectedSlides.push(action.data.slideId)
                newCurrentSlide = action.data.slideId
            }
            newState.currentSlide = newCurrentSlide
            newState.selectedSlides = newSelectedSlides
            break
        case "GO_TO_SLIDE":
            newState.currentSlide = action.data.slideId
            newState.selectedSlides = []
            newState.selectedSlideElements = []
            break
        case "DELETE_ELEMENT_SELECTION":
            newState.selectedSlideElements = []
            break
        case "DELETE_SLIDE_SELECTION":
            newState.selectedSlides = []
            break
        case "UPLOAD_PRESENTATION":
            newState = action.data.state
            break
        default:
            break
    }
    localStorage.setItem("state", JSON.stringify(newState));
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
    addSlide: () => {
        return {
            type: 'ADD_SLIDE',
        } as const
    },
    deleteSlides: () => {
        return {
            type: 'DELETE_SLIDES',
        } as const
    },
    moveSlides: (newPosition: number) => {
        return {
            type: 'MOVE_SLIDES',
            data: {
                newPosition,
            }
        } as const
    },
    addShape: (type: ShapeTypeType, position: ElementPosition, size: ElementSize|undefined) => {
        return {
            type: 'ADD_SHAPE',
            data: {
                type,
                position,
                size,
            }
        } as const
    },
    addImage: (filepath: string, position: ElementPosition, size: ElementSize|undefined) => {
        return {
            type: 'ADD_IMAGE',
            data: {
                filepath,
                position,
                size,
            }
        } as const
    },
    addTextBox: (position: ElementPosition, size: ElementSize|undefined) => {
        return {
            type: 'ADD_TEXT_BOX',
            data: {
                position,
                size,
            }
        } as const
    },
    deleteElements: () => {
        return {
            type: 'DELETE_ELEMENTS',
        } as const
    },
    setSlideBackground: (newBackground: BackgroundType) => {
        return {
            type: 'SET_SLIDE_BACKGROUND',
            data: {
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
    resizeElement: (elementId: number, newWidth: number, newHeight: number) => {
        return {
            type: 'RESIZE_ELEMENT',
            data: {
                elementId,
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
    },
    selectElement : (elementId: number) => {
        return {
            type: 'SELECT_ELEMENT',
            data: {
                elementId,
            }
        } as const
    },
    addElementToSelected : (elementId: number) => {
        return {
            type: 'ADD_ELEMENT_TO_SELECTED',
            data: {
                elementId,
            }
        } as const
    },
    selectSlide : (slideId: number) => {
        return {
            type: 'SELECT_SLIDE',
            data: {
                slideId,
            }
        } as const
    },
    addSlideToSelected: (slideId: number) => {
        return {
            type: 'ADD_SLIDE_TO_SELECTED',
            data: {
                slideId,
            }
        } as const
    },
    goToSlide: (slideId: number) => {
        return {
            type: 'GO_TO_SLIDE',
            data: {
                slideId,
            }
        } as const
    },
    deleteElementSelection: () => {
        return {
            type: 'DELETE_ELEMENT_SELECTION',
        } as const
    },
    deleteSlideSelection: () => {
        return {
            type: 'DELETE_SLIDE_SELECTION',
        } as const
    },
    uploadPresentation: (state: PresentationType) => {
        return {
            type: 'UPLOAD_PRESENTATION',
            data: {
                state,
            }
        } as const
    }
}

export {
    presentationInfoReducer,
    presentationInfoActions,
}