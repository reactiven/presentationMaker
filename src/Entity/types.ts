type State = {
  selectedSlides: Array<number>,
  selectedSlideElements: Array<number>,
  currentSlide: number,
  presentationInfo: Presentation,
  onPreview: boolean,
}

type Presentation = {
  name: string,
  slidesOrder: Array<number>,
  slides: Array<Slide>,
}

type Slide = {
  elements: Array<SlideElement>
  elementsOrder: Array<number>
  slideId: number,
  background: BackgroundType,
}

type SlideElement = {
  type: ElementType,
  dataElement: (TextBox|Image|Shape),
  width: number,
  height: number,
  xPos: number,
  yPos: number,
  elementId: number,
}

type Image = {
  src: string,
}

type Shape = {
  shapeType: ShapeType,
  fillColor: string,
  strokeColor: string,
}

type TextBox = {
  font: FontType,
  text: string,
}

type ElementType = ('textBox' | 'shape' | 'image')
type ShapeType = ('circle'|'rect'|'triangle')
type BackgroundType = (Image | string)
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

export {
	State,
	Presentation,
	Slide,
	SlideElement,
	Image,
	Shape,
	TextBox,
	ElementType,
	ShapeType,
	BackgroundType,
	FontType,
	ShapeColorType,
}