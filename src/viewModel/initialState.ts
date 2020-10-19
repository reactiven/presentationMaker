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
                elementsOrder: [0, 1],
                elements: [
                    {
                        elementId: 0,
                        type: 'shape',
                        dataElement: {
                            fillColor: '#123',
                            shapeType: 'rect',
                            strokeColor: '#456',
                        },
                        height: 200,
                        width: 200,
                        xPos: 400,
                        yPos: 100,
                    },
                    {
                        elementId: 1,
                        type: 'textBox',
                        dataElement: {
                            text: '123',
                            font: {
                                fontSize: '25px',
                                bold: false,
                                italic: true,
                                fontStyle: 'Times New Roman',
                            }
                        },
                        height: 50,
                        width: 100,
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