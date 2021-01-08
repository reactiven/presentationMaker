import {BackgroundType, FontType, PresentationType, ShapeTypeType} from "../Entity/types";
import {addElement, addImage, addShape, addSlide, addTextbox} from "./actions/addElements";
import {moveSlides} from "./actions/moveSlides";
import {saveStateForUndo, stateList} from "../Entity/State";
import {deleteSlides} from "./actions/deleteSlides";
import {deleteSlideElements} from "./actions/deleteSlideElements";
import {
    changeElement,
    changeElements,
    changeFont,
    changeFontBold,
    changeFontColor,
    changeFontItalic,
    changeFontSize,
    changeFontStyle,
    changeFontUnderline,
    changeStrokeColor,
    changeStrokeWidth,
    decFontSize,
    incFontSize,
    moveElement,
    resizeElement,
    setElementBackground,
    switchTextBoxEdit,
    updateTextBox
} from "./actions/editElementAction";

let initialState: PresentationType = {
    currentSlide: null,
    selectedSlideElements: [],
    selectedSlides: [],
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
    let newState: PresentationType = state
    switch (action.type) {
        case "CHANGE_NAME":
            newState = {
                ...state,
                presentation: {
                    ...state.presentation,
                    name: action.data.newName
                }
            }
            break
        case "SET_SLIDE_BACKGROUND":
            if (state.currentSlide)
            {
                newState = {
                    ...state,
                    presentation: {
                        ...state.presentation,
                        slides: {
                            ...state.presentation.slides,
                            [state.currentSlide]: {
                                ...state.presentation.slides[state.currentSlide],
                                background: action.data.newBackground,
                            }
                        }
                    }
                }
            }

            break
        case "ADD_SLIDE":
            newState = addSlide(state)
            break
        case "DELETE_SLIDES":
            newState = deleteSlides(state)
            break
        case "MOVE_SLIDES":
            newState = moveSlides(state, action.data.newPosition)
            break
        case "ADD_IMAGE":
            newState = addElement(
                state,
                addImage,
                action.data.position,
                action.data.size,
                {
                    filepath: action.data.filepath
                }
            )
            break
        case "ADD_SHAPE":
            newState = addElement(
                state,
                addShape,
                action.data.position,
                action.data.size,
                {
                    type: action.data.type
                }
            )
            break
        case "ADD_TEXT_BOX":
            newState = addElement(
                state,
                addTextbox,
                action.data.position,
                action.data.size,
            )
            break
        case "DELETE_ELEMENTS":
            newState = deleteSlideElements(state)
            break
        case "MOVE_ELEMENT":
            newState = changeElement(
                state,
                action.data.elementId,
                moveElement,
                {
                    newX: action.data.newX,
                    newY: action.data.newY,
                }
            )
            break
        case "RESIZE_ELEMENT":
            newState = changeElement(
                state,
                action.data.elementId,
                resizeElement,
                {
                    newWidth: action.data.newWidth,
                    newHeight: action.data.newHeight,
                }
            )
            break
        case "SET_BACKGROUND_COLOR":
            newState = changeElements(
                state,
                setElementBackground,
                {
                    newBackground: action.data.newColor,
                }
            )
            break
        case "CHANGE_FONT":
            newState = changeElements(
                state,
                changeFont,
                {
                    newFont: action.data.newFont,
                },
            )
            break
        case "CHANGE_FONT_SIZE":
            newState = changeElements(
                state,
                changeFontSize,
                {
                    newSize: action.data.newSize,
                }
            )
            break
        case "INC_FONT_SIZE":
            newState = changeElements(
                state,
                incFontSize,
            )
            break
        case "DEC_FONT_SIZE":
            newState = changeElements(
                state,
                decFontSize,
            )
            break
        case "CHANGE_FONT_STYLE":
            newState = changeElements(
                state,
                changeFontStyle,
                {
                    newFontStyle: action.data.newStyle,
                },
            )
            break
        case "CHANGE_FONT_BOLD":
            newState = changeElements(
                state,
                changeFontBold,
                {
                    bold: action.data.bold,
                },
            )
            break
        case "CHANGE_FONT_ITALIC":
            newState = changeElements(
                state,
                changeFontItalic,
                {
                    italic: action.data.italic,
                },
            )
            break
        case "CHANGE_FONT_UNDERLINE":
            newState = changeElements(
                state,
                changeFontUnderline,
                {
                    underline: action.data.underline,
                },
            )
            break
        case "CHANGE_FONT_COLOR":
            newState = changeElements(
                state,
                changeFontColor,
                {
                    newColor: action.data.newColor,
                },
            )
            break
        case "SET_STROKE_WIDTH":
            newState = changeElements(
                state,
                changeStrokeWidth,
                {
                    newWidth: action.data.newWidth,
                },
            )
            break
        case "SET_STROKE_COLOR":
            newState = changeElements(
                state,
                changeStrokeColor,
                {
                    newColor: action.data.newColor,
                },
            )
            break
        case "UPDATE_TEXT_BOX":
            newState = changeElement(
                state,
                action.data.textboxId,
                updateTextBox,
                {
                    text: action.data.text,
                },
            )
            break
        case "SWITCH_TEXTBOX_EDIT":
            newState = changeElement(
                state,
                action.data.textBoxId,
                switchTextBoxEdit,
                {
                    canEdit: action.data.canEdit,
                }
            )
            break
        case "SET_PREVIEW_IMAGE":
            if (state.currentSlide)
            {
                newState = {
                    ...state,
                    presentation: {
                        ...state.presentation,
                        slides: {
                            ...state.presentation.slides,
                            [state.currentSlide]: {
                                ...state.presentation.slides[state.currentSlide],
                                previewImage: action.data.image
                            }
                        }
                    }
                }
            }
            break
        case "REPLACE_ELEMENT_TO_FRONT":
            if (state.currentSlide)
            {
                let slide = {...state.presentation.slides[state.currentSlide]}
                const elementsOrder = [...slide.elementsOrder]
                slide.elementsOrder = elementsOrder.filter((elementId) => elementId !== action.data.elementId)
                slide.elementsOrder.push(action.data.elementId)
                return {
                    ...state,
                    presentation: {
                        ...state.presentation,
                        slides: {
                            ...state.presentation.slides,
                            [state.currentSlide]: slide,
                        }
                    }
                }
            }
            break
        case "SELECT_SLIDE":
            newState = {
                ...state,
                currentSlide: action.data.slideId,
                selectedSlideElements: [],
                selectedSlides: [action.data.slideId],
            }
            break
        case "ADD_ELEMENT_TO_SELECTED":
            newState = {
                ...state,
                selectedSlideElements: [
                    ...state.selectedSlideElements,
                    action.data.elementId,
                ]
            }
            break
        case "SELECT_ELEMENT":
            newState = {
                ...state,
                selectedSlideElements: [action.data.elementId]
            }
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
            newState = {
                ...state,
                currentSlide: newCurrentSlide,
                selectedSlides: newSelectedSlides
            }
            break
        case "DELETE_ELEMENT_SELECTION":
            newState = {
                ...newState,
                selectedSlideElements: []
            }
            break
        case "DELETE_SLIDE_SELECTION":
            newState = {
                ...newState,
                selectedSlides: []
            }
            break
        case "UPLOAD_PRESENTATION":
            newState = action.data.state
            break
        case "UNDO":
            const undoState = stateList.undoStateList.pop()
            if (undoState) {
                stateList.redoStateList.push(newState)
                newState = undoState
            }
            break
        case "REDO":
            const redoState= stateList.redoStateList.pop()
            if (redoState) {
                saveStateForUndo(redoState)
                newState = redoState
            }
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
    updateTextBox: (textboxId: number, text: string) => {
        return {
            type: 'UPDATE_TEXT_BOX',
            data: {
                textboxId,
                text,
            }
        } as const
    },
    changeFontColor: (newColor: string) => {
        return {
            type: 'CHANGE_FONT_COLOR',
            data: {
                newColor,
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
    changeFontSize: (newSize: number) => {
        return {
            type: 'CHANGE_FONT_SIZE',
            data: {
                newSize,
            }
        } as const
    },
    incFontSize: () => {
        return {
            type: 'INC_FONT_SIZE',
        } as const
    },
    decFontSize: () => {
        return {
            type: 'DEC_FONT_SIZE',
        } as const
    },
    changeFontStyle: (newStyle: string) => {
        return {
            type: 'CHANGE_FONT_STYLE',
            data: {
                newStyle,
            }
        } as const
    },
    changeFontBold: (bold: boolean) => {
        return {
            type: 'CHANGE_FONT_BOLD',
            data: {
                bold,
            }
        } as const
    },
    changeFontUnderline: (underline: boolean) => {
        return {
            type: 'CHANGE_FONT_UNDERLINE',
            data: {
                underline,
            }
        } as const
    },
    changeFontItalic: (italic: boolean) => {
        return {
            type: 'CHANGE_FONT_ITALIC',
            data: {
                italic,
            }
        } as const
    },
    switchTextBoxEdit: (textBoxId: number,canEdit: boolean) => {
        return {
            type: 'SWITCH_TEXTBOX_EDIT',
            data: {
                textBoxId,
                canEdit,
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
    },
    undo: () => {
        return {
            type: 'UNDO',
        } as const
    },
    redo: () => {
        return {
            type: 'REDO',
        } as const
    },
}

export {
    presentationInfoReducer,
    presentationInfoActions,
}