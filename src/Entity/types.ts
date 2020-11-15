type State = {
    selectedSlides: Array<number>,
    selectedSlideElements: Array<number>,
    currentSlide: number | null,
    presentationInfo: PresentationType,
    onPreview: boolean,
    editSlideBackgroundPopupOpened: boolean,
}

type StateList = {
    undoStateList: Array<State>,
    redoStateList: Array<State>,
}

type PresentationType = {
    name: string,
    slidesOrder: Array<number>,
    slides: Array<SlideType>,
}

type SlideType = {
    elements: Array<SlideElementType>
    elementsOrder: Array<number>
    slideId: number,
    background: BackgroundType,
}

type SlideElementType = {
    type: ElementType,
    dataElement: (TextBoxType | ImageType | ShapeType),
    width: number,
    height: number,
    xPos: number,
    yPos: number,
    borderWidth: string | null,
    borderColor: string | null,
    background: string | null,
    elementId: number,
}

type ImageType = {
    src: string,
}

type ShapeType = {
    shapeType: ShapeTypeType,
}

type TextBoxType = {
    font: FontType,
    text: string,
}

type ElementStyleType = {
    top: number,
    left: number,
    height: number,
    width: number,
}

type ElementType = ('textBox' | 'shape' | 'image')
type ShapeTypeType = ('circle' | 'rect' | 'triangle')
type BackgroundType = (string)
type FontType = {
    fontStyle: string,
    fontSize: string,
    fontColor: string,
    bold: boolean,
    italic: boolean,
    underline: boolean,
}
type ShapeColorType = {
    fillColor: string,
    strokeColor: string,
}

export type {
    State,
    PresentationType,
    SlideType,
    SlideElementType,
    ImageType,
    ShapeType,
    TextBoxType,
    ElementType,
    ShapeTypeType,
    BackgroundType,
    FontType,
    ElementStyleType,
    ShapeColorType,
    StateList,
}