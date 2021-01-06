import {useEventHandler} from "./useEventHandler";
import {useExternalLayer} from "./useExternalLayer";
import {Ref, RefObject, useEffect, useState} from "react";
import {Tooltip} from "../../components/common/Tooltip";
import React from "react";
import {getExternalLayer} from "../externalLayers";

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

    function appearTooltip() {
        const timer = setTimeout(() => setShow(true), 500)
        elementRef.current.addEventListener('mouseleave', () => {
            clearTimeout(timer)
            setShow(false)
        })
    }

    useEventHandler('mouseenter', elementRef, appearTooltip)

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