
type LayerType = 'popup'|'popover'

type LayersType = {
    [item: string]: HTMLDivElement,
}

const layers: LayersType = {}

function initExternalLayer(layerType: LayerType) {
    const layer = document.createElement('div')
    layer.setAttribute('id', layerType)
    layer.className = 'external-layer'
    layers[layerType] = layer
    document.body.append(layer)
}

function getExternalLayer(layerType: LayerType) {
    return layers[layerType]
}

export {
    initExternalLayer,
    getExternalLayer,
}

export type {
    LayerType
}