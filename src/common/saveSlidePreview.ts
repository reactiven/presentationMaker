import * as htmlToImage from "html-to-image";


function saveSlidePreview(fn: (dataUrl: string) => void) {
    const slide = document.getElementById('slide')
    if (slide) {
        htmlToImage.toJpeg(slide, {
            quality: 0.9,
        }).then(fn);
    }
}

export {
    saveSlidePreview,
}