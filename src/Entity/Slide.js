const Slide = {
    width: number,
    height: inumber,
    slideNumber: number,
    objects: [](Image || Shape || TextBox),
    slideId: number(string),
    background: backgroundType,
    slidePreview: previewType,
}

function AddImage(state, filepath): state {}
function AddTextBox(state, ShapeType): state {}
function AddShape(state): state {}
function DeleteObject(state): state {}
function MoveObject(state): state {}
function SetBackgroud(state): state {}


