import { Shape, State } from "./types";

const shape: Shape = {
    shapeType: 'circle',
    fillColor: '#123',
    strokeColor: '#4567',
}

function setColor(state: State, newColor: string): State{
    return state;
}

export {
    shape,
}