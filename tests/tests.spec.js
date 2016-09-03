import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Builder from "../client/containers/builder";

var component, renderer;

const middlewares = [thunk]; // add your middlewares like `redux-thunk` 
const mockStore = configureStore(middlewares);
const initialState = {
	isLoading: false,
	email: null,
	name: null,
	facebookUserId: null,
	pages: [],
	templates: []
};
const store = mockStore(initialState);

describe('Testing Builder component', () => {

    before(() => {
        // component = TestUtils.renderIntoDocument(<Builder store={store} />);
        renderer = TestUtils.createRenderer();
        renderer.render(<Builder store={store} />);
    });

    it('Builder component should contain specific inner components', () => {
        component = renderer.getRenderOutput();
        expect(component.props.children).toEqual(
            <div>
                <FacebookLogin
                    appId="1088597931155576"
                    autoLoad={true}
                    fields="name,email,picture"
                    callback={responseFacebook} 
                />
                <FanPageList pages={} />
                <TemplateList templates={} />
                <TemplateConfigPanel templateId={} />
            </div>
        );
        // expect(component).to.exist;
    });

});