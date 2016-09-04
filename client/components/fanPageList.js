import * as React from "react";

const FanPageList = (props) => (
    <ul>
        {
            (props.pages.length > 0) ? props.pages.map((page, idx) => {
                return (<li key={idx}>{page.name} - {page.about}</li>);
            }) : (<li>No Pages</li>)
        }
    </ul>
);

export default FanPageList;