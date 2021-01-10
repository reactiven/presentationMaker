import {useEventHandler} from "./useEventHandler";
import {getExternalLayer} from "../externalLayers";
import {useExternalLayer} from "./useExternalLayer";

type PropsType = {
    binding: any,
    show: boolean,
    close: () => void,
}

function usePopup({
    binding,
    show,
    close,
}: PropsType) {
    const layer = getExternalLayer('popup')

    function overlayClick(event: Event) {
        !event.defaultPrevented && close()
    }

    useEventHandler('mousedown', layer, overlayClick)

    useExternalLayer({
        layerType: 'popup',
        binding: show ? () => binding : null,
    })
}

export {
    usePopup,
}