const Presentation = {
    name: "Презентация 1",
    slides: [
        {
            elements: [
                SlideElement,
            ],
            slideId: 1,
            background: Null,
            slidePreview: null, 
        },
    ],
    currentSlide: 1,
}

presentation = Presentation{
    
}

function changeName(state, newName): state {}
function addSlide(state): state {}
function deleteSlides(state): state {}
function goToSlide(state, slideId): state {}
function getCurrentSlideInfo(state): Slide {}
function moveSlides(state, newPosition): state {}
function selectSlides(state): state