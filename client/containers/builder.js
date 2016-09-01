import * as React from "react";
import { connect } from "react-redux";
import {fecthing} from "../actions";

class Builder extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fecthing();
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

Builder = connect(mapStateToProps, {
    fecthing
})(Builder);

export default Builder;