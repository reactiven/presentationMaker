import {useEventHandler} from "./useEventHandler";
import {useExternalLayer} from "./useExternalLayer";
import React, {RefObject, useState} from "react";
import {Tooltip} from "../../components/common/Tooltip";

type PropsType = {
    elementRef: RefObject<any>,
    showTooltip: boolean,
    text: string,
}

function useTooltip({
    elementRef,
    showTooltip,
    text,
}: PropsType) {
    const [show, setShow] = useState(false)

    let appearTimer: NodeJS.Timeout

    function appearTooltip() {
        appearTimer = setTimeout(() => setShow(true), 800)
    }

    function closeTooltip() {
        clearTimeout(appearTimer)
        setShow(false)
    }

    useEventHandler('mouseenter', elementRef, appearTooltip)
    useEventHandler('mouseleave', elementRef, closeTooltip)
    useEventHandler('click', elementRef, closeTooltip)

    useExternalLayer({
        layerType: 'tooltip',
        show: show && showTooltip,
        binding: <Tooltip
            text={text}
            elementRef={elementRef}
        />,
    })
}

export {
    useTooltip,
}