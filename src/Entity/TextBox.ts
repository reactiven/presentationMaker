import { FontType, State, TextBox } from "./types";

const TextBox: TextBox = {
    font: {
        fontStyle: 'Times New Roman',
        fontSize: '2px',
        bold: true,
        italic: true,
    }
}

function changeFont(state: State, newFont: FontType): State{
    return state;
}
function updateTextBox(state: State, text: string): State{
    return state;
}