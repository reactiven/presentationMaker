import {FontType, PresentationType, SlideElementType} from "../../Entity/types";
import {isTextBox} from "../../Entity/TextBox";

function changeElements(state: PresentationType, fn: any, data?: any): PresentationType {
    const currentSlide = state.currentSlide
    if (currentSlide)
    {
        const slide = {...state.presentation.slides[currentSlide]}
        const elements = {...slide.elements}

        state.selectedSlideElements.forEach(elementId => {
            elements[elementId] = fn(elements[elementId], data)
        })
        slide.elements = elements
        return {
            ...state,
            presentation: {
                ...state.presentation,
                slides: {
                    ...state.presentation.slides,
                    [currentSlide]: slide,
                }
            }
        }
    }
    return state
}

function changeElement(state: PresentationType, elementId: number, fn: any, data: any) {
    const currentSlide = state.currentSlide as number
    const slide = {...state.presentation.slides[currentSlide]}
    const element = {...slide.elements[elementId]}
    slide.elements[elementId] = fn(element, data)
    return {
        ...state,
        presentation: {
            ...state.presentation,
            slides: {
                ...state.presentation.slides,
                [currentSlide]: slide,
            }
        }
    }
}


function moveElement(
    element: SlideElementType,
    data: {
        newX: number,
        newY: number
    }
): SlideElementType {
    return {
        ...element,
        xPos: data.newX,
        yPos: data.newY
    }
}

function resizeElement(
    element: SlideElementType,
    data: {
        newHeight: number,
        newWidth: number
    }
): SlideElementType {
    return {
        ...element,
        width: data.newWidth,
        height: data.newHeight,
    }
}

function updateTextBox(
    element: SlideElementType,
    data: {
        text: string,
    }
): SlideElementType {
    if (isTextBox(element.dataElement))
    {
        return {
            ...element,
            dataElement: {
                ...element.dataElement,
                text: data.text,
            }
        }
    }
    return element
}

function setElementBackground(
    element: SlideElementType,
    data: {
        newBackground: string,
    }
): SlideElementType {
    if (element.type !== 'image')
    {
        return {
            ...element,
            background: data.newBackground,
        }
    }
    return element
}

function changeFont(
    element: SlideElementType,
    data: {
        newFont: FontType,
    }
): SlideElementType {
    if (isTextBox(element.dataElement))
    {
        return {
            ...element,
            dataElement: {
                ...element.dataElement,
                font: {...data.newFont}
            }
        }
    }
    return element
}

function switchTextBoxEdit(
    element: SlideElementType,
    data: {
        canEdit: boolean,
    }
): SlideElementType {
    if (isTextBox(element.dataElement))
    {
        return {
            ...element,
            dataElement: {
                ...element.dataElement,
                canEdit: data.canEdit,
            }
        }
    }
    return element
}

function changeFontSize(
    element: SlideElementType,
    data: {
        newSize: number,
    }
): SlideElementType {
    if (isTextBox(element.dataElement))
    {
        return {
            ...element,
            dataElement: {
                ...element.dataElement,
                font: {
                    ...element.dataElement.font,
                    fontSize: data.newSize,
                }
            }
        }
    }
    return element
}

function incFontSize(
    element: SlideElementType,
): SlideElementType {
    if (isTextBox(element.dataElement))
    {
        return {
            ...element,
            dataElement: {
                ...element.dataElement,
                font: {
                    ...element.dataElement.font,
                    fontSize: ++element.dataElement.font.fontSize,
                }
            }
        }
    }
    return element
}

function decFontSize(
    element: SlideElementType,
): SlideElementType {
    if (isTextBox(element.dataElement))
    {
        return {
            ...element,
            dataElement: {
                ...element.dataElement,
                font: {
                    ...element.dataElement.font,
                    fontSize: --element.dataElement.font.fontSize,
                }
            }
        }
    }
    return element
}

function changeFontStyle(
    element: SlideElementType,
    data: {
        newFontStyle: string,
    }
): SlideElementType {
    if (isTextBox(element.dataElement))
    {
        return {
            ...element,
            dataElement: {
                ...element.dataElement,
                font: {
                    ...element.dataElement.font,
                    fontStyle: data.newFontStyle,
                }
            }
        }
    }
    return element
}

function changeFontBold(
    element: SlideElementType,
    data: {
        bold: boolean,
    }
): SlideElementType {
    if (isTextBox(element.dataElement))
    {
        return {
            ...element,
            dataElement: {
                ...element.dataElement,
                font: {
                    ...element.dataElement.font,
                    bold: data.bold,
                }
            }
        }
    }
    return element
}

function changeFontItalic(
    element: SlideElementType,
    data: {
        italic: boolean,
    }
): SlideElementType {
    if (isTextBox(element.dataElement))
    {
        return {
            ...element,
            dataElement: {
                ...element.dataElement,
                font: {
                    ...element.dataElement.font,
                    italic: data.italic,
                }
            }
        }
    }
    return element
}

function changeFontUnderline(
    element: SlideElementType,
    data: {
        underline: boolean,
    }
): SlideElementType {
    if (isTextBox(element.dataElement))
    {
        return {
            ...element,
            dataElement: {
                ...element.dataElement,
                font: {
                    ...element.dataElement.font,
                    underline: data.underline,
                }
            }
        }
    }
    return element
}

function changeFontColor(
    element: SlideElementType,
    data: {
        newColor: string,
    }
): SlideElementType {
    if (isTextBox(element.dataElement))
    {
        return {
            ...element,
            dataElement: {
                ...element.dataElement,
                font: {
                    ...element.dataElement.font,
                    fontColor: data.newColor,
                }
            }
        }
    }
    return element
}

function changeStrokeWidth(
    element: SlideElementType,
    data: {
        newWidth: string,
    }
): SlideElementType {
    return {
        ...element,
        borderWidth: data.newWidth,
    }
}

function changeStrokeColor(
    element: SlideElementType,
    data: {
        newColor: string,
    }
): SlideElementType {
    return {
        ...element,
        borderColor: data.newColor,
    }
}

export {
    changeElements,
    changeElement,
    changeFont,
    moveElement,
    updateTextBox,
    resizeElement,
    changeFontSize,
    decFontSize,
    incFontSize,
    changeFontStyle,
    changeFontBold,
    changeFontItalic,
    changeFontUnderline,
    changeFontColor,
    changeStrokeWidth,
    changeStrokeColor,
    switchTextBoxEdit,
    setElementBackground,
}