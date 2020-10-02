import { BackgroundType, Slide, State } from "./types";

const Slide: Slide = {
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
            type: 'textBox',
            dataElement: TextBox,
            width: 1000,
            height: 1000,
            xPos: 200,
            yPos: 300,
            elementId: 1,
        },
        {
            type: 'shape',
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
}

function AddImage(state: State, filepath: string): State {
    return state;
}
function AddTextBox(state: State): State{
    return state;
}
function AddShape(state: State): State{
    return state;
}
function DeleteObject(state: State): State{
    return state;
}
function MoveObject(state: State): State{
    return state;
}
function SetBackgroud(state: State, newBackground: BackgroundType): State{
    return state;
}