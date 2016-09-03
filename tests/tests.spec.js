import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Builder from "../client/containers/builder";

var component;

const middlewares = [thunk]; // add your middlewares like `redux-thunk` 
const mockStore = configureStore(middlewares);
const initialState = {};
const store = mockStore(initialState);

describe('Testing Builder component', () => {

    before(() => {
        component = TestUtils.renderIntoDocument(<Builder store={store} />);
    });

    it('Builder component should exist', () => {
        expect(component).to.exist;
    });

});