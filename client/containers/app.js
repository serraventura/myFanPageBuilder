import * as React from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import Builder from "../containers/builder";

export class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Helmet
                    title="mypage.online"
                    link={this.props.facebookData.templateResources}
                />
                <h1>App</h1>
                <Builder className="builder-component"></Builder>
            </div>
        );
    }
};

// export default App;

let mapStateToProps = (state) => {
    return {
        facebookData: state.facebookData
    }
};

export default connect(mapStateToProps)(App);
