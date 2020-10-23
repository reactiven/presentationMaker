import { State } from './types'
import { setColor } from './Shape'

describe('Shape test', () => {
	test('Set color #123', () => {
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
						elementsOrder: [0],
						elements: [
							{
								type: 'shape',
								elementId: 0,
								height: 200,
								width: 200,
								xPos: 50,
								yPos: 50,
								dataElement: {
									shapeType: 'rect',
									fillColor: '#000',
									strokeColor: '#000', 
								}
							}
						]
					}
				]
			}
		}
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
						elementsOrder: [0],
						elements: [
							{
								type: 'shape',
								elementId: 0,
								height: 200,
								width: 200,
								xPos: 50,
								yPos: 50,
								dataElement: {
									shapeType: 'rect',
									fillColor: '#123456',
									strokeColor: '#654321', 
								}
							}
						]
					}
				]
			}
		}
		expect(setColor(initialState, {
			newColor: {
				fillColor: '#123456',
				strokeColor: '#654321',
			}
		})).toEqual(newState)
	})
})