import { State } from "../Entity/types";


const initialState: State = {
    onPreview: false,
    currentSlide: 2,
    selectedSlideElements: [1],
    selectedSlides: [2],
    presentationInfo: {
        name: 'new presentation',
        slidesOrder: [0, 2, 1],
        slides: [
            {
                slideId: 0,
                background: '#fed',
                elementsOrder: [0, 1],
                elements: [
                    {
                        elementId: 0,
                        type: 'shape',
                        dataElement: {
                            fillColor: '#123',
                            shapeType: 'circle',
                            strokeColor: '#456',
                        },
                        height: 200,
                        width: 200,
                        xPos: 50,
                        yPos: 50,
                    },
                    {
                        elementId: 1,
                        type: 'shape',
                        dataElement: {
                            fillColor: '#123',
                            shapeType: 'triangle',
                            strokeColor: '#456',
                        },
                        height: 100,
                        width: 500,
                        xPos: 50,
                        yPos: 150,
                    },
                ]
            },
            {
                slideId: 1,
                background: '#439',
                elementsOrder: [0],
                elements: [
                    {
                        elementId: 0,
                        type: 'textBox',
                        dataElement: {
                            font: {
                                bold: false,
                                italic: true,
                                fontSize: '50px',
                                fontStyle: 'Calibri',
                            },
                            text: 'Жопа'
                        },
                        height: 100,
                        width: 200,
                        xPos: 100,
                        yPos: 150,
                    }
                ]
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