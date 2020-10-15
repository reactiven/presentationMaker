import { Shape, ShapeColorType, State } from './types'

const shape: Shape = {
	shapeType: 'circle',
	fillColor: '#123',
	strokeColor: '#4567',
}

function setColor(state: State, newColor: ShapeColorType): State {
	const slides = [...state.presentationInfo.slides]
	const slide = {...slides[slides.findIndex(slide => slide.slideId === state.currentSlide)]}
	const elements = [...slide.elements]
	const element = {...elements[elements.findIndex(element => element.elementId === state.selectedSlideElements[0])]}
	const dataElement = {...element.dataElement}
	if (isShape(dataElement)){
		dataElement.fillColor = newColor.fillColor
		dataElement.strokeColor = newColor.strokeColor
	}
	element.dataElement = dataElement
	let elementNumber: number = elements.findIndex(element => element.elementId === state.selectedSlideElements[0]) 
	if (elementNumber < elements.length)
	{
		elements[elementNumber] = element
	}
	slide.elements = elements
	slides[slides.findIndex(slide => slide.slideId === state.currentSlide)] = slide
	return {
		...state,
		presentationInfo: {
			...state.presentationInfo,
			slides
		}
	}
}

function isShape(dataElement: any): dataElement is Shape {
	return dataElement.shapeType !== undefined && dataElement.fillColor !== undefined && dataElement.strokeColor !== undefined
}

export {
	shape,
	setColor,
}