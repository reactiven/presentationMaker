import {useEventHandler} from "./useEventHandler";
import {getExternalLayer} from "../externalLayers";
import {useExternalLayer} from "./useExternalLayer";
import React, {RefObject} from "react";
import {Popover} from "../../components/common/Popover";

type PropsType = {
    elementRef: RefObject<any>,
    show: boolean,
    setShow: (show: boolean) => void,
    content: any,
}

function usePopover({
    elementRef,
    show,
    setShow,
    content,
}: PropsType) {
    const layer = getExternalLayer('popover')

    function overlayClick(event: Event) {
        !event.defaultPrevented && setShow(false)
    }

    useEventHandler('mousedown', layer, overlayClick)

    useExternalLayer({
        layerType: 'popover',
        show,
        binding: <Popover
            control={elementRef}
            content={content}
            closePopover={() => setShow(false)}
        />,
    })
}

export {
    usePopover,
}