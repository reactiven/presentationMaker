import * as htmlToImage from "html-to-image";
import {slideHTML} from "../components/editor/workspace/Slide";


function saveSlidePreview(fn: (dataUrl: string) => void) {
    const slide = slideHTML
    if (slide) {
        htmlToImage.toJpeg(slide, {
            quality: 1,
        }).then(fn);
    }
}

export {
    saveSlidePreview,
}