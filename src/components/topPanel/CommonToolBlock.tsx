import {Button} from "../common/Button";
import plusIcon from "../../images/add_new.png";
import {dispatch} from "../../state/state-manager";
import {addSlide} from "../../Entity/Presentation";
import arrowLeft from "../../images/undo.png";
import {redo, undo} from "../../Entity/State";
import arrowRight from "../../images/redo.png";
import './CommonToolBlock.css';
import React from "react";

function CommonToolBlock() {

    return(
        <div className='common-tool-block'>
            <Button
                type={'border-none'}
                img={plusIcon}
                onClick={() => dispatch(addSlide)}
            />
            <Button
                type={'border-none'}
                img={arrowLeft}
                onClick={() => dispatch(undo)}
            />
            <Button
                type={'border-none'}
                img={arrowRight}
                onClick={() => dispatch(redo)}
            />
        </div>
    )
}

export {
    CommonToolBlock,
}