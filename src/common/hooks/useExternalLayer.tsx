import {useEffect} from "react";
import ReactDOM from "react-dom";
import {useEventHandler} from "./useEventHandler";
import {getExternalLayer} from "../externalLayers";

type PropsType = {
    layerType: 'popup' | 'popover',
    binding: any,
    show: boolean,
    close: () => void,
}

function useExternalLayer({
    layerType,
    binding,
    show,
    close,
}: PropsType) {
    const layer = getExternalLayer(layerType)

    function overlayClick(event: Event) {
        !event.defaultPrevented && close()
    }

    useEventHandler('mousedown', layer, overlayClick)

    useEffect(() => {
        show && ReactDOM.render(binding, layer)
    }, [show, binding, layer])

    useEffect(() => {
        layer.style.display = show
            ? 'block'
            : 'none'
    }, [show, layer])
}

export {
    useExternalLayer,
}