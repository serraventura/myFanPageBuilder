import * as React from "react";
import {HIDE, UNHIDE} from "../config";
import InputElement from "./inputElement";

const LiveTemplate = (props) => {

    let menuItems = !props.templateConfig ? [] : Object.keys(props.templateConfig.menu||{});
    let menuItemSelected = props.templateConfig ? props.templateConfig.menuItemSelected : null;
    let menuItemOptions = (!props.templateConfig || !menuItemSelected) ? [] : Object.keys(props.templateConfig.menu[menuItemSelected]||{});

    return (
        <div className="live-template-component" style={props.open ? UNHIDE : HIDE} >
            <div className="live-template-painel">

                <h3>Template configuration</h3>

                <div><input type="checkbox" id="useFanpageCover" /><label htmlFor="useFanpageCover">Use Fan Page cover picture</label></div>

                <div className="live-template-painel-subpainel-left">
                    <h4>Menu</h4>
                    <ul className="live-template-menu-items">
                        {
                            menuItems.map(item => {
                                return (
                                    <li 
                                        onClick={ e => props.onSetupMenuItem(item) } 
                                        key={item} 
                                        className={item === menuItemSelected ? 'active' : ''}
                                    >
                                        <a href="javascript:void(0);">Duplicate</a> - {props.templateConfig.menu[item].name}
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>

                <div className="live-template-painel-subpainel-right">
                    <h4>Menu Options</h4>
                    <ul>

                        {
                            menuItemOptions.map(item => {
                                return (
                                    <li key={item}>
                                        <InputElement 
                                            templateConfig={props.templateConfig} 
                                            menuItem={menuItemSelected}
                                            subMenuItem={item}
                                            onChangeMenuItem={props.onChangeMenuItem}>
                                        </InputElement>
                                    </li>
                                );
                            })
                        }

                    </ul>

                </div>

                <button onClick={ e => props.onClose()}>Close</button><button>Publish</button><button onClick={ e => props.onPreview() }>Preview with my Fanpage</button>

            </div>
            <div className="live-template-footer"></div>
            <iframe 
                key={props.selectedTemplate}
                scrolling="auto" 
                src={props.srcTemplate}
                allowFullScreen 
            />

        </div>
    );
}

export default LiveTemplate;