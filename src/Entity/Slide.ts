import { image } from './Image'
import { shape } from './Shape'
import { generateElementId } from './SlideElement'
import { textBox } from './TextBox'
import { BackgroundType, SlideType, State, SlideElementType, ShapeTypeType } from './types'

const slide: SlideType = {
	elements: [
		{
			type: 'image',
			dataElement: image,
			width: 1000,
			height: 1000,
			xPos: 200,
			yPos: 300,
			elementId: 0,
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
			elementId: 2,
		},
	],
	elementsOrder: [0, 1, 2],
	slideId: 0,
	background: '#123123',
}

function AddImage(state: State, payload: {filepath: string}): State {
	const slides = [...state.presentationInfo.slides]
	const slide = {...slides[slides.findIndex(slide => slide.slideId === state.currentSlide)]}
	const elements = [...slide.elements]
	const elementsOrder = [...slide.elementsOrder]
	const defaultImage: SlideElementType = {
		type: 'image',
		dataElement: {
			src: payload.filepath,
		},
		elementId: generateElementId(),
		width: 200,
		height: 200,
		xPos: 400,
		yPos: 400,
	}
	elements.push(defaultImage)
	elementsOrder.push(defaultImage.elementId)
	slide.elements = elements
	slide.elementsOrder = elementsOrder
	slides[slides.findIndex(slide => slide.slideId === state.currentSlide)] = slide
	return {
		...state,
		presentationInfo: {
			...state.presentationInfo,
			slides,
		}
	}
}
function AddTextBox(state: State): State{
	const slides = [...state.presentationInfo.slides]
	const slide = {...slides[slides.findIndex(slide => slide.slideId === state.currentSlide)]}
	const elements = [...slide.elements]
	const elementsOrder = [...slide.elementsOrder]
	const defaultTextBox: SlideElementType = {
		type: 'textBox',
		dataElement: {
			font: {
				fontStyle: 'Times New Roman',
				fontSize: '20px',
				bold: false,
				italic: false,
			},
			text: '',
		},
		elementId: generateElementId(),
		width: 200,
		height: 200,
		xPos: 400,
		yPos: 400,
	}
	elements.push(defaultTextBox)
	elementsOrder.push(defaultTextBox.elementId)
	slide.elements = elements
	slide.elementsOrder = elementsOrder
	slides[slides.findIndex(slide => slide.slideId === state.currentSlide)] = slide
	return {
		...state,
		presentationInfo: {
			...state.presentationInfo,
			slides
		}
	}
}
function AddShape(state: State, payload: {type: ShapeTypeType}): State{
	const slides = [...state.presentationInfo.slides]
	const slide = {...slides[slides.findIndex(slide => slide.slideId === state.currentSlide)]}
	const elements = [...slide.elements]
	const elementsOrder = [...slide.elementsOrder]
	const defaultShape: SlideElementType = {
		type: 'shape',
		dataElement: {
			shapeType: payload.type,
			fillColor: '#000',
			strokeColor: '#000',
		},
		elementId: elements.length,
		width: 200,
		height: 200,
		xPos: 400,
		yPos: 400,
	}
	elements.push(defaultShape)
	elementsOrder.push(defaultShape.elementId)
	slide.elements = elements
	slide.elementsOrder = elementsOrder
	slides[slides.findIndex(slide => slide.slideId === state.currentSlide)] = slide
	return {
		...state,
		presentationInfo: {
			...state.presentationInfo,
			slides
		}
	}
}
function DeleteElements(state: State): State{
	let selectedSlideElements = [...state.selectedSlideElements]
	const slides = [...state.presentationInfo.slides]
	const slide = {...slides[slides.findIndex(slide => slide.slideId === state.currentSlide)]}
	let elementsOrder = [...slide.elementsOrder]
	let elements = [...slide.elements]
	
	elements = elements.filter((element) => {
		const elementId = element.elementId
		const isSelected = selectedSlideElements.indexOf(elementId) !== -1
		return !isSelected
	})
	elementsOrder = elementsOrder.filter(elementId => {
		const isSelected = selectedSlideElements.indexOf(elementId) !== -1
		return !isSelected
	}) 
	selectedSlideElements = []
	
	slide.elementsOrder = elementsOrder
	slide.elements = elements
	slides[slides.findIndex(slide => slide.slideId === state.currentSlide)] = slide
	return {
		...state,
		selectedSlideElements,
		presentationInfo: {
			...state.presentationInfo,
			slides
		}
	}
}
function SetBackgroud(state: State, payload: {newBackground: BackgroundType}): State{
	const slides = [...state.presentationInfo.slides]
	const slide = {...slides[slides.findIndex(slide => slide.slideId === state.currentSlide)]}
	slide.background = payload.newBackground
	slides[slides.findIndex(slide => slide.slideId === state.currentSlide)] = slide
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