const Slide = {
    elements: [
        {
            type: 'image',
            dataElement: Image,
            width: 1000,
            height: 1000,
            xPos: 200,
            yPos: 300,
            elementId: 1,
        },
        {
            type: 'TextBox',
            dataElement: TextBox,
            width: 1000,
            height: 1000,
            xPos: 200,
            yPos: 300,
            elementId: 1,
        },
        {
            type: 'Shape',
            dataElement: Shape,
            width: 1000,
            height: 1000,
            xPos: 200,
            yPos: 300,
            elementId: 1,
        },
    ],
    slideId: 1,
    background: 'image',
    slidePreview: previewType,
}

function AddImage(state, filepath){
    return state;
}
function AddTextBox(state){
    return state;
}
function AddShape(state){
    return state;
}
function DeleteObject(state){
    return state;
}
function MoveObject(state){
    return state;
}
function SetBackgroud(state, newBackground){
    return state;
}