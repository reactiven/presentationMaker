const Presentation = {
    name: "Презентация 1",
    slides: [
        {
            elements: [
                {
                    type: TextBox,
                    width: 1000,
                    height: 1000,
                    xPos: 200,
                    yPos: 300,
                    elementId: 1,
                }
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