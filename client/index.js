import * as React from "react";

import {render} from "react-dom";
import {Router, Route, hashHistory} from "react-router";
import {Provider} from "react-redux";
import {createStore} from "redux";

import rootReducer from "./reducers/root";
import App from "./components/app";

const store = createStore(rootReducer);

render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={App}></Route>
		</Router>
	</Provider>,
	document.getElementById("app")
);