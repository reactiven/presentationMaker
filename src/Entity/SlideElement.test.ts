import { moveElement, resizeElement, selectElement, addElementToSelected } from './SlideElement'
import { State } from './types'

const initialState: State = {
	currentSlide: 0,
	onPreview: false,
	selectedSlideElements: [0],
	selectedSlides: [],
	presentationInfo: {
		name: 'presentation1',
		slidesOrder: [0],
		slides: [
			{
				background: '#000',
				slideId: 0,
				elementsOrder: [0, 1],
				elements: [
					{
						type: 'image',
						elementId: 0,
						height: 200,
						width: 200,
						xPos: 50,
						yPos: 50,
						dataElement: {
							src: '/src/images/img.png',
						}
					},
					{
						type: 'image',
						elementId: 1,
						height: 200,
						width: 200,
						xPos: 50,
						yPos: 50,
						dataElement: {
							src: '/src/images/img.png',
						}
					}
				]
			}
		]
	}
}
describe('SlideElements test', () => {
	
	test('move element', () => {
		const newState: State = {
			currentSlide: 0,
			onPreview: false,
			selectedSlideElements: [0],
			selectedSlides: [],
			presentationInfo: {
				slidesOrder: [0],
				name: 'presentation1',
				slides: [
					{
						background: '#000',
						slideId: 0,
						elementsOrder: [0, 1],
						elements: [
							{
								type: 'image',
								elementId: 0,
								height: 200,
								width: 200,
								xPos: 50,
								yPos: 50,
								dataElement: {
									src: '/src/images/img.png',
								}
							},
							{
								type: 'image',
								elementId: 1,
								height: 200,
								width: 200,
								xPos: 40,
								yPos: 70,
								dataElement: {
									src: '/src/images/img.png',
								}
							}
						]
					}
				]
			}
		}
		expect(moveElement(initialState, {
			elementId:1,
			newX: 40,
			newY: 70
		})).toEqual(newState)
	})
    
	test('resize element', () => {
		const newState: State = {
			currentSlide: 0,
			onPreview: false,
			selectedSlideElements: [0],
			selectedSlides: [],
			presentationInfo: {
				name: 'presentation1',
				slidesOrder: [0],
				slides: [
					{
						background: '#000',
						slideId: 0,
						elementsOrder: [0, 1],
						elements: [
							{
								type: 'image',
								elementId: 0,
								height: 300,
								width: 150,
								xPos: 50,
								yPos: 50,
								dataElement: {
									src: '/src/images/img.png',
								}
							},
							{
								type: 'image',
								elementId: 1,
								height: 200,
								width: 200,
								xPos: 50,
								yPos: 50,
								dataElement: {
									src: '/src/images/img.png',
								}
							}
						]
					}
				]
			}
		}
		expect(resizeElement(initialState, {
			newWidth: 150,
			newHeight: 300,
		})).toEqual(newState)
	})
	test('add element to select', () => {
		const newState: State = {
			currentSlide: 0,
			onPreview: false,
			selectedSlideElements: [0, 1],
			selectedSlides: [],
			presentationInfo: {
				name: 'presentation1',
				slidesOrder: [0],
				slides: [
					{
						background: '#000',
						slideId: 0,
						elementsOrder: [0, 1],
						elements: [
							{
								type: 'image',
								elementId: 0,
								height: 200,
								width: 200,
								xPos: 50,
								yPos: 50,
								dataElement: {
									src: '/src/images/img.png',
								}
							},
							{
								type: 'image',
								elementId: 1,
								height: 200,
								width: 200,
								xPos: 50,
								yPos: 50,
								dataElement: {
									src: '/src/images/img.png',
								}
							}
						]
					}
				]
			}
		}

		expect(addElementToSelected(initialState, {
			elementId: 1,
		})).toEqual(newState)
	})
    

	test('select one element', () => {
		const newState: State = {
			currentSlide: 0,
			onPreview: false,
			selectedSlideElements: [1],
			selectedSlides: [],
			presentationInfo: {
				name: 'presentation1',
				slidesOrder: [0],
				slides: [
					{
						background: '#000',
						slideId: 0,
						elementsOrder: [0, 1],
						elements: [
							{
								type: 'image',
								elementId: 0,
								height: 200,
								width: 200,
								xPos: 50,
								yPos: 50,
								dataElement: {
									src: '/src/images/img.png',
								}
							},
							{
								type: 'image',
								elementId: 1,
								height: 200,
								width: 200,
								xPos: 50,
								yPos: 50,
								dataElement: {
									src: '/src/images/img.png',
								}
							}
						]
					}
				]
			}
		}
        
		expect(selectElement(initialState, {
			elementId: 1,
		})).toEqual(newState)
	})
})