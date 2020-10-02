import { Shape, State } from "./types";

const Shape: Shape = {
    shapeType: 'circle',
    fillColor: '#123',
    strokeColor: '#4567',
}

function setColor(state: State, newColor: string): State{
    return state;
}