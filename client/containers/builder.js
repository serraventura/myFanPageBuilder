import * as React from "react";
import { connect } from "react-redux";
import {getFacebookData} from "../actions";
import FacebookLogin from 'react-facebook-login';

export class Builder extends React.Component {

    constructor(props) {
        super(props);
        // this.facebookResponse = this.facebookResponse.bind(this);
    }

    componentWillMount() {
    }

    // facebookResponse(response) {
    //     console.log('response: ', response);
    // }

    render() {
        console.log('p: ', this.props);
        return (
            <div>
                <FacebookLogin
                    appId="1670457943200950"
                    autoLoad={true}
                    fields="id,name,email"
                    scope="email,manage_pages"
                    callback={this.props.getFacebookData} 
                />
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