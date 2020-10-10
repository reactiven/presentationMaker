import { FontType, State, TextBox } from './types'

const textBox: TextBox = {
	font: {
		fontStyle: 'Times New Roman',
		fontSize: '2px',
		bold: true,
		italic: true,
	},
	text: 'text',
}

function changeFont(state: State, newFont: FontType): State{
	const slides = [...state.presentationInfo.slides]
	const slide = {...slides.find(slide => slide.slideId === state.currentSlide)}
	const elements = [...slide.elements]
	const element = {...elements.find(element => element.elementId === state.selectedSlideElements[0])}
	const dataElement = {...element.dataElement}
	if (isTextBox(dataElement)){
		dataElement.font = {...newFont}
	}
	element.dataElement = dataElement
	elements[elements.findIndex(element => element.elementId === state.selectedSlideElements[0])] = element
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
function updateTextBox(state: State, text: string): State {
	const slides = [...state.presentationInfo.slides]
	const slide = {...slides.find(slide => slide.slideId === state.currentSlide)}
	const elements = [...slide.elements]
	const element = {...elements.find(element => element.elementId === state.selectedSlideElements[0])}
	const dataElement = {...element.dataElement}
	if (isTextBox(dataElement)){
		dataElement.text = text
	}
	element.dataElement = dataElement
	elements[elements.findIndex(element => element.elementId === state.selectedSlideElements[0])] = element
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

function isTextBox(dataElement: any): dataElement is TextBox {
	return dataElement.font !== undefined
}

export {
	textBox,
	changeFont,
	updateTextBox,
}