import {useEffect} from "react";

function useEventHandler(type: string, element: any, callback: (e: any) => void) {
    useEffect(() => {
        element && (
            element.current
                ? element.current
                : element
        ).addEventListener(type, callback)

        return () => {
            element && (
                element.current
                    ? element.current
                    : element
            ).removeEventListener(type, callback)
        }
    }, [type, element, callback])
}

export {
    useEventHandler,
}