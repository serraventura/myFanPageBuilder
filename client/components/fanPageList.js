import * as React from "react";

const FanPageList = (props) => (
    <div className="fanpage-list-component">
        <ul>
            {
                (props.pages.length > 0) ? props.pages.map((page, idx) => {
                    return (
                        <li key={idx}>

                            <input  key={idx + '-checkbox'}
                                    id={'page-id-' + idx}
                                    name="page"
                                    type="radio"
                                    value={page.id}
                                    onChange={e => {
                                        props.onSelectPage(e.target.value);
                                    }}
                            />

                            <label  key={idx + '-label'} 
                                    htmlFor={'page-id-' + idx}
                            >
                                {page.name} - {page.about}
                            </label>

                        </li>
                    );
                }) : (<li>No Pages</li>)
            }
        </ul>
    </div>
);

export default FanPageList;