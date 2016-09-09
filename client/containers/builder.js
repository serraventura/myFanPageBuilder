import * as React from "react";
import { connect } from "react-redux";
import FacebookLogin from 'react-facebook-login';

import {
    getFacebookData, 
    selectPage, 
    setFanPageListStep,
    getListTemplates
} from "../actions";

import FanPageList from "../components/fanPageList";
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
            <div style={facebookData.fanPageListStepDone ? HIDE : UNHIDE}>
                {(facebookData.isLoading) ? <span>Loading...</span> : ''}
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
                <FanPageList pages={facebookData.pages} onSelectPage={this.props.selectPage} />
                <button 
                    onClick={e => {
                        this.props.setFanPageListStep(true);
                        this.props.getListTemplates();
                    }}
                >
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
    setFanPageListStep,
    getListTemplates
})(Builder);

// export default Builder;