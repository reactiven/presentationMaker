import { moveElement, resizeElement, selectElement, deleteSelect } from './SlideElement'
import { State } from './types'

const initialState: State = {
	currentSlide: 0,
	onPreview: false,
	selectedSlideElements: [0],
	selectedSlides: [],
	presentationInfo: {
		name: 'presentation1',
		slides: [
			{
				background: '#000',
				slideId: 0,
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
				name: 'presentation1',
				slides: [
					{
						background: '#000',
						slideId: 0,
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
		expect(moveElement(initialState, 1, 40, 70)).toEqual(newState)
	})
    
	test('move element', () => {
		const newState: State = {
			currentSlide: 0,
			onPreview: false,
			selectedSlideElements: [0],
			selectedSlides: [],
			presentationInfo: {
				name: 'presentation1',
				slides: [
					{
						background: '#000',
						slideId: 0,
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
								height: 300,
								width: 150,
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
		expect(resizeElement(initialState, 1, 150, 300)).toEqual(newState)
	})
	test('add element to select', () => {
		const newState: State = {
			currentSlide: 0,
			onPreview: false,
			selectedSlideElements: [0, 1],
			selectedSlides: [],
			presentationInfo: {
				name: 'presentation1',
				slides: [
					{
						background: '#000',
						slideId: 0,
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

		expect(selectElement(initialState, 1)).toEqual(newState)
	})
    

	test('delete selection of elements', () => {
		const newState: State = {
			currentSlide: 0,
			onPreview: false,
			selectedSlideElements: [],
			selectedSlides: [],
			presentationInfo: {
				name: 'presentation1',
				slides: [
					{
						background: '#000',
						slideId: 0,
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
        
		expect(deleteSelect(initialState)).toEqual(newState)
	})
})