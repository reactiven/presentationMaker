import { generateElementId } from './SlideElement'
import { BackgroundType, State, SlideElementType, ShapeTypeType } from './types'

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
		xPos: null,
		yPos: null,
		background: null,
		borderWidth: null,
		borderColor: null,
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
				fontColor: '#000',
				bold: false,
				italic: false,
				underline: false,
			},
			text: '',
		},
		elementId: generateElementId(),
		width: 200,
		height: 200,
		xPos: null,
		yPos: null,
		background: null,
		borderWidth: null,
		borderColor: null,
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
		},
		elementId: elements.length,
		width: 200,
		height: 200,
		xPos: null,
		yPos: null,
		background: null,
		borderWidth: null,
		borderColor: null,
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
	AddImage,
	AddTextBox,
	AddShape,
	DeleteElements,
	SetBackgroud,
}