import * as React from "react";
import { connect } from "react-redux";
import FacebookLogin from 'react-facebook-login';

import {
    getFacebookData, 
    selectPage, 
    selectTemplate,
    signUp
} from "../actions";

import FanPageList from "../components/fanPageList";
import TemplateList from "../components/templateList";
import {HIDE, UNHIDE, FB_LOGIN_CONFIG} from "../config";

// const iframeFull = {
//     "position": "absolute",
//     "top": "0",
//     "left": "0",
//     "width": "100%",
//     "height": "100%",
//     "color":"black",
//     "zIndex": "200"
// };

const iframeFull = {};

export class Builder extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {}

    render() {
        console.log('state load: ', this.props);

        let facebookData = this.props.facebookData;

        return (
            <div>
                {(facebookData.isLoading) ? <span>Loading...</span> : ''}

                <div>
                    {
                        (facebookData.loginStatus !== 'connected') 
                            ? <FacebookLogin 
                                className="facebook-login-component"
                                appId={FB_LOGIN_CONFIG.appId} 
                                autoLoad={FB_LOGIN_CONFIG.autoLoad}
                                fields={FB_LOGIN_CONFIG.fields}
                                scope={FB_LOGIN_CONFIG.scope}
                                callback={this.props.getFacebookData} 
                                />
                            : <span>Hello {facebookData.name} - <a href="#">logout</a></span>
                    }
                </div>

                <div>
                    <FanPageList 
                        className="fanpage-list-component"
                        pages={facebookData.pages} 
                        onSelectPage={this.props.selectPage} 
                    />
                </div>
                
                <TemplateList className="template-list-component" templates={facebookData.templates} onSelectTemplate={this.props.selectTemplate} />

                <iframe 
                    className="live-template-component"
                    key={facebookData.selectedTemplate}
                    scrolling="auto" 
                    style={iframeFull}
                    src={facebookData.selectedPageTemplateUrl}
                    allowFullScreen 
                />

                <button onClick={ e => this.props.signUp() }>
                    Next
                </button>
            </div>
        );
    }

};

let mapStateToProps = (state) => {
    return {
        facebookData: state.facebookData
    }
};

export default connect(mapStateToProps, {
    getFacebookData,
    selectPage,
    selectTemplate,
    signUp
})(Builder);

// export default Builder;