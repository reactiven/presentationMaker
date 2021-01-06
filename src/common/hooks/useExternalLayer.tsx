import {useEffect} from "react";
import ReactDOM from "react-dom";
import {getExternalLayer, LayerType, hideLowerLayers, cleanExternalLayer} from "../externalLayers";

type PropsType = {
    layerType: LayerType,
    binding: any,
    show: boolean,
}

function useExternalLayer({
    layerType,
    binding,
    show,
}: PropsType) {
    useEffect(() => {
        const layer = getExternalLayer(layerType)
        hideLowerLayers(layerType)
        show
            ? ReactDOM.render(binding, layer)
            : cleanExternalLayer(layerType)
    }, [show, binding, layerType])
}

export {
    useExternalLayer,
}