import {Button} from "../common/Button";
import plusIcon from "../../images/add_new.png";
import arrowLeft from "../../images/undo.png";
import arrowRight from "../../images/redo.png";
import './CommonToolBlock.css';
import React, {useContext} from "react";
import {ToolSeparator} from "./ToolPanel";
import {StoreType} from "../../state/store";
import {StoreContext} from "../../state/storeContext";
import {presentationInfoActions} from "../../state/presentationInfoReducer";

function CommonToolBlock() {
    const store: Readonly<StoreType> = useContext(StoreContext);

    function addSlide() {
        store.dispatch(presentationInfoActions.addSlide())
    }

    return(
        <div className='common-tool-block'>
            <Button
                type={'border-none'}
                img={plusIcon}
                onClick={addSlide}
            />
            <Button
                type={'border-none'}
                img={arrowLeft}
                onClick={() => store.dispatch(presentationInfoActions.undo())}
            />
            <Button
                type={'border-none'}
                img={arrowRight}
                onClick={() => store.dispatch(presentationInfoActions.redo())}
            />
            <ToolSeparator/>
        </div>
    )
}

export {
    CommonToolBlock,
}