import {Button} from "../common/Button";
import plusIcon from "../../images/add_new.png";
import {dispatch} from "../../state/state-manager";
import {addSlide} from "../../Entity/Presentation";
import arrowLeft from "../../images/undo.png";
import {redo, undo} from "../../Entity/State";
import arrowRight from "../../images/redo.png";
import './CommonToolBlock.css';
import React, {useContext} from "react";
import {ToolSeparator} from "./ToolPanel";
import {StoreType} from "../../state/store";
import {StoreContext} from "../../state/storeContext";
import {presentationInfoActions} from "../../state/presentationInfoReducer";
import {selectionReducerActions} from "../../state/selectionReducer";

function CommonToolBlock() {
    const store: Readonly<StoreType> = useContext(StoreContext);
    const {
        selection,
    } = store.getState()

    function addSlide() {
        store.dispatch(presentationInfoActions.addSlide(Number(selection.currentSlide)))
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
                onClick={() => {}/*dispatch(undo)*/}
            />
            <Button
                type={'border-none'}
                img={arrowRight}
                onClick={() => {}/*dispatch(redo)*/}
            />
            <ToolSeparator/>
        </div>
    )
}

export {
    CommonToolBlock,
}