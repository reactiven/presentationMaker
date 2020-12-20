import {PreviewInfoType} from "../Entity/types";
import {SelectionStateType} from "./selectionReducer";

let initialState = {
    currentSlide: 0,
    onPreview: false,
}

const previewReducer = (state: PreviewInfoType = initialState, action: ActionTypes): PreviewInfoType => {
    let newState: PreviewInfoType = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case "PREV_SLIDE":
            newState = {
                ...newState,
                currentSlide: newState.currentSlide - 1,
            }
            break
        case "NEXT_SLIDE":
            newState = {
                ...newState,
                currentSlide: newState.currentSlide + 1,
            }
            break
        case "SET_PREVIEW_OPENED":
            newState = {
                currentSlide: 0,
                onPreview: action.data.opened,
            }
            break
        default:
            break
    }
    return newState;
}

type ActionTypes = ReturnType<PropertiesType<typeof previewReducerActions>>;

type PropertiesType<T> = T extends { [key: string]: infer U} ? U: never;

const previewReducerActions = {
    setPreviewOpened : (opened: boolean) => {
        return {
            type: 'SET_PREVIEW_OPENED',
            data: {
                opened,
            }
        } as const
    },
    nextSlide : () => {
        return {
            type: 'NEXT_SLIDE',
        } as const
    },
    prevSlide : () => {
        return {
            type: 'PREV_SLIDE',
        } as const
    },
}

export {
    previewReducer,
    previewReducerActions,
}