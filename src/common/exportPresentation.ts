import {SlidesMapType} from "../Entity/types";
import jsPDF from "jspdf";


function exportPresentation(slides: SlidesMapType, slidesOrder: Array<number>, presentationName: string): void {
    const doc = new jsPDF()
    slidesOrder.forEach((slideId, index) => {
        const slide = {...slides[slideId]}
        doc.addImage(slide.previewImage,'JPEG', 5, 40, 200, 115)
        if (index < Object.keys(slides).length - 1) {
            doc.addPage()
        }
    })
    doc.save(`${presentationName}.pdf`)
}

export {
    exportPresentation,
}