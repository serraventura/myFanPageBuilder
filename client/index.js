import * as React from "react";

import {render} from "react-dom";
import {Router, Route, hashHistory} from "react-router";
import {Provider} from "react-redux";

import './styles/style.less';

import App from "./components/app";
import configureStore from "./store/configureStore";

const store = configureStore();

render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={App}></Route>
		</Router>
	</Provider>,
	document.getElementById("app")
);