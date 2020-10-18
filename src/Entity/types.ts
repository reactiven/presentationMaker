type State = {
  selectedSlides: Array<number>,
  selectedSlideElements: Array<number>,
  currentSlide: number,
  presentationInfo: PresentationType,
  onPreview: boolean,
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
  dataElement: (TextBoxType|ImageType|ShapeType),
  width: number,
  height: number,
  xPos: number,
  yPos: number,
  elementId: number,
}

type ImageType = {
  src: string,
}

type ShapeType = {
  shapeType: ShapeTypeType,
  fillColor: string,
  strokeColor: string,
}

type TextBoxType = {
  font: FontType,
  text: string,
}

type ElementType = ('textBox' | 'shape' | 'image')
type ShapeTypeType = ('circle'|'rect'|'triangle')
type BackgroundType = (string)
type FontType = {
  fontStyle: string,
  fontSize: string,
  bold: boolean,
  italic: boolean,
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
	ShapeColorType,
	StateList, 
}