import * as React from "react";
import { connect } from "react-redux";
import {getFacebookData} from "../actions";
import FacebookLogin from 'react-facebook-login';

export class Builder extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {}

    render() {
        console.log('p: ', this.props);

        let facebookData = this.props.facebookData;

        return (
            <div>
                {(facebookData.isLoading) ? <span>Loading...</span> : ''}
                {
                    (facebookData.loginStatus !== 'connected') 
                        ? <FacebookLogin appId="1670457943200950" autoLoad={true} fields="id,name,email" scope="email,manage_pages" callback={this.props.getFacebookData} />
                        : <span>Hello {facebookData.name} - <a href="#">logout</a></span>
                }

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
    getFacebookData
})(Builder);

// export default Builder;