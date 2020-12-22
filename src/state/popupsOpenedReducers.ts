export type PopupOpenedReducerType = typeof initialState;

let initialState = {
    editSlideBackgroundPopupOpened: false,
    addImageLinkPopupOpened: false,
}

const popupsOpenedReducer = (state: PopupOpenedReducerType = initialState, action: ActionTypes): PopupOpenedReducerType => {
    let newState: PopupOpenedReducerType = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case "SET_EDIT_SLIDE_BACKGROUND_POPUP_OPENED":
            newState = {
                ...newState,
                editSlideBackgroundPopupOpened: action.data.opened,
            }
            break
        case "SET_ADD_IMAGE_LINK_POPUP_OPENED":
            newState = {
                ...newState,
                addImageLinkPopupOpened: action.data.opened,
            }
            break
        case "RESET_STATE_TO_DEFAULT":
            newState = {
                editSlideBackgroundPopupOpened: false,
                addImageLinkPopupOpened: false,
            }
            break
        default:
            break
    }
    return newState;
}

type ActionTypes = ReturnType<PropertiesType<typeof popupOpenedReducerActions>>;

type PropertiesType<T> = T extends { [key: string]: infer U} ? U: never;

const popupOpenedReducerActions = {
    setEditSlideBackgroundPopupOpened : (opened: boolean) => {
        return {
            type: 'SET_EDIT_SLIDE_BACKGROUND_POPUP_OPENED',
            data: {
                opened,
            }
        } as const
    },
    setAddImageLinkPopupOpened : (opened: boolean) => {
        return {
            type: 'SET_ADD_IMAGE_LINK_POPUP_OPENED',
            data: {
                opened,
            }
        } as const
    },
    resetStateToDefault: () => {
        return {
            type: 'RESET_STATE_TO_DEFAULT',
        } as const
    }
}

export {
    popupsOpenedReducer,
    popupOpenedReducerActions,
}