import * as React from "react";
import {HIDE, UNHIDE} from "../config";

const LiveTemplate = (props) => (
    <div 
        className="live-template-component"
        style={props.open ? UNHIDE : HIDE}
    >
        <div className="live-template-painel"></div>
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