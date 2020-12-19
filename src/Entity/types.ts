type State = {
    selectedSlides: Array<number>,
    selectedSlideElements: Array<number>,
    currentSlide: number | null,
    presentationInfo: PresentationType,
    previewInfo: PreviewInfoType,
    editSlideBackgroundPopupOpened: boolean,
    addImageLinkPopupOpened: boolean,
    insertionMode: InsertionModeType,
}
type PreviewInfoType = {
    onPreview: boolean,
    currentSlide: number,
}

type InsertionModeType = {
    on: boolean,
    elementType: ElementType | null,
    shapeType?: ShapeTypeType,
    filepath?: string,
}

type StateList = {
    undoStateList: Array<State>,
    redoStateList: Array<State>,
}

type SlidesMapType = {
    [item: number]: SlideType,
}

type PresentationType = {
    name: string,
    slidesOrder: Array<number>,
    slides: SlidesMapType,
}

type ElementsMapType = {
    [item: number]: SlideElementType,
}

type SlideType = {
    elements: ElementsMapType
    elementsOrder: Array<number>
    slideId: number,
    background: BackgroundType,
    previewImage: any | null,
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
    fontSize: number,
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
    InsertionModeType,
    FontType,
    ElementStyleType,
    ShapeColorType,
    StateList,
    SlidesMapType,
    ElementsMapType,
    PreviewInfoType,
}