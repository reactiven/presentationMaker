type State = {
  selectedSlides: Array<number>,
  selectedSlideElements: Array<number>,
  currentSlide: number,
  presentationInfo: Presentation,
  onPreview: boolean,
}

type Presentation = {
  name: string,
  slides: Array<Slide>,
}

type Slide = {
  elements: Array<SlideElement>
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
}

type ElementType = ('textBox' | 'shape' | 'image')
type ShapeType = ('circle'|'rect'|'triangle')
type BackgroundType = (Image | string)
type FontType = {
  fontStyle: String,
  fontSize: string,
  bold: boolean,
  italic: boolean,
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
}