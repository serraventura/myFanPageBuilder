import * as React from "react";
import {HIDE, UNHIDE} from "../config";
import InputElement from "./inputElement";
import Frame from "react-frame-component";

export default class LiveTemplate extends React.Component {
// const LiveTemplate = (props) => {

    constructor(props) {
        super(props);
        this.menuItems = !props.templateConfig ? [] : Object.keys(props.templateConfig.menu||{});
        this.menuItemSelected = props.templateConfig ? props.templateConfig.menuItemSelected : null;
        this.menuItemOptions = (!props.templateConfig || !this.menuItemSelected) ? [] : Object.keys(props.templateConfig.menu[this.menuItemSelected]||{});
    }

    contentDidMount() {
        console.log('contentDidMount');
    }

    render() {
        return (<div className="live-template-component" style={this.props.open ? UNHIDE : HIDE} >
            <div className="live-template-painel">

                <h3>Template configuration</h3>

                <div><input type="checkbox" id="useFanpageCover" /><label htmlFor="useFanpageCover">Use Fan Page cover picture</label></div>

                <div className="live-template-painel-subpainel-left">
                    <h4>Menu</h4>
                    <ul className="live-template-menu-items">
                        {
                            this.menuItems.map(item => {
                                return (
                                    <li 
                                        onClick={ e => this.props.onSetupMenuItem(item) } 
                                        key={item} 
                                        className={item === this.menuItemSelected ? 'active' : ''}
                                    >
                                        <a href="javascript:void(0);">Duplicate</a> - {this.props.templateConfig.menu[item].name}
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
                            this.menuItemOptions.map(item => {
                                return (
                                    <li key={item}>
                                        <InputElement 
                                            templateConfig={this.props.templateConfig} 
                                            menuItem={this.menuItemSelected}
                                            subMenuItem={item}
                                            onChangeMenuItem={this.props.onChangeMenuItem}>
                                        </InputElement>
                                    </li>
                                );
                            })
                        }

                    </ul>

                </div>

                <button onClick={ e => this.props.onClose()}>Close</button><button>Publish</button><button onClick={ e => this.props.onPreview() }>Preview with my Fanpage</button>

            </div>
            <div className="live-template-footer"></div>
            {
                // <iframe 
                //     key={this.props.selectedTemplate}
                //     scrolling="auto" 
                //     src={this.props.srcTemplate}
                //     allowFullScreen 
                // />
            }
            <Frame mountTarget='.frame-root' initialContent={this.props.selectedTemplateContent}></Frame>

        </div>);
    };
}

// export default LiveTemplate;