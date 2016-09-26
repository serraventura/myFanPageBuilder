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
                        pages={facebookData.pages} 
                        onSelectPage={this.props.selectPage} 
                    />
                </div>
                
                <TemplateList templates={facebookData.templates} onSelectTemplate={this.props.selectTemplate} />

                <iframe 
                    key={facebookData.selectedTemplate}
                    style={facebookData.isLoading ? HIDE : UNHIDE} 
                    scrolling="auto" 
                    src={facebookData.selectedPageTemplateUrl}
                    allowfullscreen 
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