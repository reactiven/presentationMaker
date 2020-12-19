export type SelectionStateType = typeof initialState;

let initialState = {
    currentSlide: null as null|number,
    selectedSlideElements: [] as Array<number>,
    selectedSlides: [] as Array<number>,
}

const selectionReducer = (state = initialState, action: ActionTypes): SelectionStateType => {
    let newState = { ...state }
    switch (action.type) {
        case "SELECT_SLIDE":
            newState = {
                ...newState,
                currentSlide: action.data.slideId,
                selectedSlideElements: [],
                selectedSlides: [action.data.slideId]
            }
            break
        case "ADD_ELEMENT_TO_SELECTED":
            const selectedSlideElements = [...state.selectedSlideElements]
            selectedSlideElements.push(action.data.elementId)
            newState = {
                ...newState,
                selectedSlideElements,
            }
            break
        case "SELECT_ELEMENT":
            newState = {
                ...newState,
                selectedSlideElements: [action.data.elementId],
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
            newState =  {
                ...newState,
                currentSlide: newCurrentSlide,
                selectedSlides: newSelectedSlides,
            }
            break
        case "GO_TO_SLIDE":
            newState = {
                ...state,
                currentSlide: action.data.slideId,
                selectedSlides: [],
                selectedSlideElements: [],
            }
            break
        case "DELETE_ELEMENT_SELECTION":
            newState = {
                ...state,
                selectedSlideElements: [],
            }
            break
        case "DELETE_SLIDE_SELECTION":
            newState = {
                ...state,
                selectedSlides: [],
            }
            break
        default:
            break
    }
    return newState;
}

type ActionTypes = ReturnType<PropertiesType<typeof selectionReducerActions>>;

type PropertiesType<T> = T extends { [key: string]: infer U} ? U: never;

const selectionReducerActions = {
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
    }
}

export {
    selectionReducer,
    selectionReducerActions,
}