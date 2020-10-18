import { State } from "../Entity/types";


const initialState: State = {
    onPreview: false,
    currentSlide: 2,
    selectedSlideElements: [],
    selectedSlides: [2],
    presentationInfo: {
        name: 'new presentation',
        slidesOrder: [0, 1, 2],
        slides: [
            {
                slideId: 0,
                background: '456',
                elementsOrder: [0],
                elements: []
            },
            {
                slideId: 1,
                background: '#123',
                elementsOrder: [],
                elements: []
            },
            {
                slideId: 2,
                background: '#fff',
                elementsOrder: [0],
                elements: [
                    {
                        elementId: 0,
                        type: 'shape',
                        dataElement: {
                            fillColor: '#000',
                            shapeType: 'rect',
                            strokeColor: '#000',
                        },
                        height: 200,
                        width: 200,
                        xPos: 100,
                        yPos: 100,
                    },
                ]
            },
        ],
    }
}

export {
    initialState,
}