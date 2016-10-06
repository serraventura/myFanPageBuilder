import * as React from "react";
import {HIDE, UNHIDE} from "../config";

const LiveTemplate = (props) => (
    <div 
        className="live-template-component"
        style={props.open ? UNHIDE : HIDE}
    >
        <div className="live-template-painel">

            <h3>Template configuration</h3>

            <div><input type="checkbox" id="useFanpageCover" /><label htmlFor="useFanpageCover">Use Fan Page cover picture</label></div>

            <div className="live-template-painel-subpainel-left">
                <h4>Menu</h4>
                <ul className="live-template-menu-items">
                    <li className="active">About Us</li>
                    <li>Photos</li>
                    <li>Blog</li>
                    <li>Services</li>
                </ul>
            </div>

            <div className="live-template-painel-subpainel-right">
                <h4>Menu Options</h4>
                <ul>
                    <li>
                        Name: <input type="text" />
                    </li>
                    <li>
                        Initial Page: <input type="checkbox" />
                    </li>
                    <li>
                        Location: <input type="checkbox" />
                    </li>
                    <li>
                        Active: <input type="checkbox" />
                    </li>
                    <li>
                        Hashtag: <input type="text" />
                    </li>
                    <li>
                        Active: <input type="checkbox" />
                    </li>
                    <li>
                        Active: <input type="checkbox" />
                    </li>                                                            
                </ul>

            </div>

            <button>Close</button>

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

export default LiveTemplate;