import * as React from "react";
import {API} from "../config";

const TemplateList = (props) => (
    <div className="template-list-component">
        <ul>
            {
                (props.templates.length > 0) ? props.templates.map((template, idx) => {
                    return (
                        <li key={idx}>
                            <img src={ API().imageTemplates + "/" + template.name +"/" + template.name + ".jpg" }/>
                            <button onClick={e => {props.onSelectTemplate(template.name)}}>See Live Template</button>
                        </li>
                    );
                }) : (<li>No templates</li>)
            }
        </ul>
    </div>
);

export default TemplateList;