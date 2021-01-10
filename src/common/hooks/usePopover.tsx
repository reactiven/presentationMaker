import {useEventHandler} from "./useEventHandler";
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
    const root = document.getElementById('root')

    useEventHandler('mousedown', root,  () => setShow(false))

    useExternalLayer({
        layerType: 'popover',
        binding: show
            ? () => <Popover
                control={elementRef}
                content={content}
                closePopover={() => setShow(false)}
            />
            : null,
    })
}

export {
    usePopover,
}