import * as React from "react";
import {HIDE, UNHIDE} from "../config";

const renderInput = (props) => {

    let inputValue = props.templateConfig.menu[props.menuItem][props.subMenuItem];

    if (typeof(inputValue) === 'boolean') {
        return (<input type="checkbox" checked={inputValue} onChange={ e => props.onChangeMenuItem(props.menuItem, props.subMenuItem, e.target.checked) } />);
    } else if (typeof(inputValue) === 'string') {
        return (<input type="text" value={inputValue} onChange={ e => props.onChangeMenuItem(props.menuItem, props.subMenuItem, e.target.value) } />);
    }

};

const InputElement = (props) => {

    return (
        <div className="input-element-component" >
            {props.subMenuItem} {renderInput(props)}
        </div>
    );
}

export default InputElement;