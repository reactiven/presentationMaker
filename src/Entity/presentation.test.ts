import { State } from './types'
import { moveSlides } from './Presentation'

const initialState1: State = {
	currentSlide: 0,
	onPreview: false,
	selectedSlideElements: [],
	selectedSlides: [0, 2],
	presentationInfo: {
		name: 'presentation1',
		slides: [
			{
				background: '#000',
				slideId: 0,
				elements: []
			},
			{
				background: '#001',
				slideId: 1,
				elements: []
			},
			{
				background: '#002',
				slideId: 2,
				elements: []
			},
			{
				background: '#003',
				slideId: 3,
				elements: []
			},
			{
				background: '#004',
				slideId: 4,
				elements: []
			}
		]
	}
}

const initialState2: State = {
	currentSlide: 0,
	onPreview: false,
	selectedSlideElements: [],
	selectedSlides: [2, 4],
	presentationInfo: {
		name: 'presentation1',
		slides: [
			{
				background: '#000',
				slideId: 0,
				elements: []
			},
			{
				background: '#001',
				slideId: 1,
				elements: []
			},
			{
				background: '#002',
				slideId: 2,
				elements: []
			},
			{
				background: '#003',
				slideId: 3,
				elements: []
			},
			{
				background: '#004',
				slideId: 4,
				elements: []
			}
		]
	}
}

describe('move selected slides ', () => {
	test('move 0 and 2 slide to 4 position', () => {
		const newState: State = {
			currentSlide: 0,
			onPreview: false,
			selectedSlideElements: [],
			selectedSlides: [2, 3],
			presentationInfo: {
				name: 'presentation1',
				slides: [
					{
						background: '#001',
						slideId: 0,
						elements: []
					},
					{
						background: '#003',
						slideId: 1,
						elements: []
					},
					{
						background: '#000',
						slideId: 2,
						elements: []
					},
					{
						background: '#002',
						slideId: 3,
						elements: []
					},
					{
						background: '#004',
						slideId: 4,
						elements: []
					}
				]
			}
		}

		expect(moveSlides(initialState1, 4)).toEqual(newState)
	})

	test('move 2 and 4 slide to 1 position', () => {
		const newState: State = {
			currentSlide: 0,
			onPreview: false,
			selectedSlideElements: [],
			selectedSlides: [1, 2],
			presentationInfo: {
				name: 'presentation1',
				slides: [
					{
						background: '#000',
						slideId: 0,
						elements: []
					},
					{
						background: '#002',
						slideId: 1,
						elements: []
					},
					{
						background: '#004',
						slideId: 2,
						elements: []
					},
					{
						background: '#001',
						slideId: 3,
						elements: []
					},
					{
						background: '#003',
						slideId: 4,
						elements: []
					}
				]
			}
		}

		expect(moveSlides(initialState2, 1)).toEqual(newState)
	})
})