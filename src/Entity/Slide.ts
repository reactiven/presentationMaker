import { image } from './Image'
import { shape } from './Shape'
import { textBox } from './TextBox'
import { BackgroundType, Slide, State, SlideElement, ShapeType } from './types'

const slide: Slide = {
	elements: [
		{
			type: 'image',
			dataElement: image,
			width: 1000,
			height: 1000,
			xPos: 200,
			yPos: 300,
			elementId: 1,
		},
		{
			type: 'textBox',
			dataElement: textBox,
			width: 1000,
			height: 1000,
			xPos: 200,
			yPos: 300,
			elementId: 1,
		},
		{
			type: 'shape',
			dataElement: shape,
			width: 1000,
			height: 1000,
			xPos: 200,
			yPos: 300,
			elementId: 1,
		},
	],
	slideId: 1,
	background: 'image',
}

function AddImage(state: State, filepath: string): State {
	const slides = [...state.presentationInfo.slides]
	const slide = {...slides[state.currentSlide]}
	let elements = [...slide.elements]
	const defaultImage: SlideElement = {
		type: 'image',
		dataElement: {
			src: filepath,
		},
		elementId: elements.length,
		width: 200,
		height: 200,
		xPos: 400,
		yPos: 400,
	}
	elements = [
		...elements,
		defaultImage,
	]
	slide.elements = elements
	slides[state.currentSlide] = slide
	return {
		...state,
		presentationInfo: {
			...state.presentationInfo,
			slides
		}
	}
}
function AddTextBox(state: State): State{
	const slides = [...state.presentationInfo.slides]
	const slide = {...slides[state.currentSlide]}
	let elements = [...slide.elements]
	const defaultTextBox: SlideElement = {
		type: 'image',
		dataElement: {
			font: {
				fontStyle: 'Times New Roman',
				fontSize: '2px',
				bold: false,
				italic: false,
			},
			text: '',
		},
		elementId: elements.length,
		width: 200,
		height: 200,
		xPos: 400,
		yPos: 400,
	}
	elements = [
		...elements,
		defaultTextBox,
	]
	slide.elements = elements
	slides[state.currentSlide] = slide
	return {
		...state,
		presentationInfo: {
			...state.presentationInfo,
			slides
		}
	}
}
function AddShape(state: State, type: ShapeType): State{
	const slides = [...state.presentationInfo.slides]
	const slide = {...slides[state.currentSlide]}
	let elements = [...slide.elements]
	const defaultShape: SlideElement = {
		type: 'shape',
		dataElement: {
			shapeType: type,
			fillColor: '#000',
			strokeColor: '#000',
		},
		elementId: elements.length,
		width: 200,
		height: 200,
		xPos: 400,
		yPos: 400,
	}
	elements = [
		...elements,
		defaultShape,
	]
	slide.elements = elements
	slides[state.currentSlide] = slide
	return {
		...state,
		presentationInfo: {
			...state.presentationInfo,
			slides
		}
	}
}
function DeleteElements(state: State): State{
	const slides = [...state.presentationInfo.slides]
	const slide = {...slides[state.currentSlide]}
	const elements = [...slide.elements].filter((element) => (state.selectedSlideElements.indexOf(element.elementId)))
    
	slide.elements = elements
	slides[state.currentSlide] = slide
	return {
		...state,
		presentationInfo: {
			...state.presentationInfo,
			slides
		}
	}
}
function SetBackgroud(state: State, newBackground: BackgroundType): State{
	const slides = [...state.presentationInfo.slides]
	const slide = {...slides[state.currentSlide]}
	slide.background = newBackground
	slides[state.currentSlide] = slide
	return {
		...state,
		presentationInfo: {
			...state.presentationInfo,
			slides
		}
	}
}

export {
	slide,
	AddImage,
	AddTextBox,
	AddShape,
	DeleteElements,
	SetBackgroud,
}