import * as React from "react";
import {API} from "../config";

const TemplateList = (props) => (
    <ul>
        {
            (props.templates.length > 0) ? props.templates.map((template, idx) => {
                return (
                    <li key={idx}>

                        {template.name} - <img src={ API().imageTemplates + "/" + template.name +"/" + template.name + ".jpg" } />

                    </li>
                );
            }) : (<li>No templates</li>)
        }
    </ul>
);

export default TemplateList;