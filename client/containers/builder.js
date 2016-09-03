import * as React from "react";
import { connect } from "react-redux";
import {fecthed} from "../actions";
import FacebookLogin from 'react-facebook-login';

export class Builder extends React.Component {

    constructor(props) {
        super(props);
        this.facebookResponse = this.facebookResponse.bind(this);
    }

    componentWillMount() {
        this.props.fecthed();
    }

    facebookResponse(response) {
        console.log('response: ', response);
    }

    render() {
        console.log('p: ', this.props);
        return (
            <div>
                <FacebookLogin
                    appId="1670457943200950"
                    autoLoad={true}
                    fields="id,name,email"
                    scope="email,manage_pages"
                    callback={this.facebookResponse} 
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
    fecthed
})(Builder);

// export default Builder;