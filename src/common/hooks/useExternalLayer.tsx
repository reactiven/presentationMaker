import {useEffect} from "react";
import ReactDOM from "react-dom";
import {getExternalLayer, LayerType, hideLowerLayers, cleanExternalLayer} from "../externalLayers";

type PropsType = {
    layerType: LayerType,
    binding: ((() => any )| null),
}

function useExternalLayer({
    layerType,
    binding,
}: PropsType) {
    useEffect(() => {
        const layer = getExternalLayer(layerType)
        hideLowerLayers(layerType)
        binding
            ? ReactDOM.render(binding(), layer)
            : cleanExternalLayer(layerType)
    }, [binding, layerType])
}

export {
    useExternalLayer,
}