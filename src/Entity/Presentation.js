const Presentation = {
    name: string,
    slides: []Slide,
    selection: slideId,
    selectedSlides: []slideId,
}

function changeName(state, newName): state {}
function addSlide(state): state {}
function deleteSlides(state): state {}
function goToSlide(state, slideId): state {}
function getCurrentSlideInfo(state): Slide {}
function moveSlides(state, newPosition): state {}
function selectSlides(state): state