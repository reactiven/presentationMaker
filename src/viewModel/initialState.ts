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
                            shapeType: 'circle',
                        },
                        height: 200,
                        width: 200,
                        xPos: 50,
                        yPos: 50,
                        borderColor: '#456',
                        borderWidth: '6',
                        background: '#987',
                    },
                    {
                        elementId: 1,
                        type: 'shape',
                        dataElement: {
                            shapeType: 'triangle',
                        },
                        height: 100,
                        width: 500,
                        xPos: 50,
                        yPos: 150,
                        borderColor: '#052719',
                        borderWidth: '4',
                        background: '#187932',
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
                            text: 'Слайд',
                        },
                        height: 100,
                        width: 200,
                        xPos: 100,
                        yPos: 150,
                        borderColor: '#052719',
                        borderWidth: '4px',
                        background: '#187932',
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
                            shapeType: 'rect',
                        },
                        height: 200,
                        width: 200,
                        xPos: 400,
                        yPos: 100,
                        borderColor: '#785',
                        borderWidth: '2',
                        background: '#f22',
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
                            },
                        },
                        height: 50,
                        width: 100,
                        xPos: 100,
                        yPos: 100,
                        borderColor: '#504918',
                        borderWidth: '5px',
                        background: '#985612',
                    },
                ]
            },
        ],
    }
}

export {
    initialState,
}