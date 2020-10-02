import { textBox } from "./TextBox";
import { State } from "./types";

const slideElement = {
    type: 'texBox',
    dataElement: textBox,
    width: 1000,
    height: 1000,
    xPos: 200,
    yPos: 300,
    elementId: 1,
}

function moveElement(state: State, newX: number, newY: number): State {
    return state;
}
function resizeElement(state: State, newWidth: number, newHeight: number): State {
    return state;
}

export {
    slideElement,
}