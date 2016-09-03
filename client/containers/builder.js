import * as React from "react";
import { connect } from "react-redux";
import {fecthed} from "../actions";

export class Builder extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fecthed();
    }

    render() {
        console.log('p: ', this.props);
        return (<div>xxxxx</div>);
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