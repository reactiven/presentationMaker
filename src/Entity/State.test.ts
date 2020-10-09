import { redo, saveStateForUndo, undo } from './State'
import { State, StateList } from './types'

describe('State test', () => {
	
	test('undo test', () => {
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
		saveStateForUndo(newState)
		expect(undo()).toEqual(newState)
	})

	test('redo test', () => {
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
		saveStateForUndo(newState)
		undo()
		expect(redo()).toEqual(newState)

	})
})
