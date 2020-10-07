import { AddImage, DeleteElements, SetBackgroud } from "./Slide"
import { State } from "./types"


describe('slide tests', () => {
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
							},
						},
						{
							type: 'shape',
							elementId: 1,
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
	// test('add Image', () => {
	// 	const filepath = '/src/images/img.png'
	// 	const newState: State = {
	// 		currentSlide: 0,
	// 		onPreview: false,
	// 		selectedSlideElements: [0],
	// 		selectedSlides: [],
	// 		presentationInfo: {
	// 			name: 'presentation1',
	// 			slidesOrder: [0],
	// 			slides: [
	// 				{
	// 					background: '#000',
	// 					slideId: 0,
	// 					elementsOrder: [0, 1],
	// 					elements: [
	// 						{
	// 							type: 'shape',
	// 							elementId: 0,
	// 							height: 200,
	// 							width: 200,
	// 							xPos: 50,
	// 							yPos: 50,
	// 							dataElement: {
	// 								shapeType: 'rect',
	// 								fillColor: '#000',
	// 								strokeColor: '#000', 
	// 							}
	// 						},
	// 						{
	// 							type: 'image',
	// 							dataElement: {
	// 								src: filepath,
	// 							},
	// 							elementId: 1,
	// 							width: 200,
	// 							height: 200,
	// 							xPos: 400,
	// 							yPos: 400,
	// 						}
	// 					]
	// 				}
	// 			]
	// 		}
	// 	}

	// 	expect(AddImage(initialState, filepath)).toEqual(newState)
	// })

	test('delete element', () => {
		const filepath = '/src/images/img.png'
		const newState: State = {
			currentSlide: 0,
			onPreview: false,
			selectedSlideElements: [],
			selectedSlides: [],
			presentationInfo: {
				name: 'presentation1',
				slidesOrder: [0],
				slides: [
					{
						background: '#000',
						slideId: 0,
						elementsOrder: [1],
						elements: [
							{
								type: 'shape',
								elementId: 1,
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

		expect(DeleteElements(initialState)).toEqual(newState)
	})

	test('set background to current slide', () => {
		const initialState: State = {
			currentSlide: 0,
			onPreview: false,
			selectedSlideElements: [],
			selectedSlides: [],
			presentationInfo: {
				name: 'presentation1',
				slidesOrder: [0],
				slides: [
					{
						slideId: 0,
						background: '#122345',
						elementsOrder: [],
						elements: [],
					},
					{
						slideId: 1,
						background: '#321',
						elementsOrder: [],
						elements: [],
					}
				]
			}
		}
		const newState: State = {
			currentSlide: 0,
			onPreview: false,
			selectedSlideElements: [],
			selectedSlides: [],
			presentationInfo: {
				name: 'presentation1',
				slidesOrder: [0],
				slides: [
					{
						slideId: 0,
						background: '/src/image/1.png',
						elementsOrder: [],
						elements: [],
					},
					{
						slideId: 1,
						background: '#321',
						elementsOrder: [],
						elements: [],
					}
				]
			}
		}
		expect(SetBackgroud(initialState, '/src/image/1.png')).toEqual(newState)
	})
})