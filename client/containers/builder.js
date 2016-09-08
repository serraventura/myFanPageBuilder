import * as React from "react";
import { connect } from "react-redux";
import {getFacebookData, selectPage, setFanPageListStep} from "../actions";
import FacebookLogin from 'react-facebook-login';

import FanPageList from "../components/fanPageList";
import {HIDE, UNHIDE} from "../config";

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
                        ? <FacebookLogin appId="1670457943200950" autoLoad={true} fields="id,name,email" scope="email,manage_pages" callback={this.props.getFacebookData} />
                        : <span>Hello {facebookData.name} - <a href="#">logout</a></span>
                }
                <FanPageList pages={facebookData.pages} onSelectPage={this.props.selectPage} />
                <button 
                    onClick={e => {
                        this.props.setFanPageListStep(true);
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
    setFanPageListStep
})(Builder);

// export default Builder;