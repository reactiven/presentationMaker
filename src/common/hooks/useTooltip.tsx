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

    function appearTooltip() {
        const timer = setTimeout(() => setShow(true), 800)
        elementRef.current.addEventListener('mouseout', () => {
            clearTimeout(timer)
            setShow(false)
        })
    }

    useEventHandler('mouseover', elementRef, appearTooltip)

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