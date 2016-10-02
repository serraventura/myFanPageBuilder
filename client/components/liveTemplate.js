import * as React from "react";

const LiveTemplate = (props) => (
    <div className="live-template-component">
        <div className="live-template-painel"></div>
        <iframe 
            key={props.selectedTemplate}
            scrolling="auto" 
            src={props.srcTemplate}
            allowFullScreen 
        />
    </div>
);

export default LiveTemplate;