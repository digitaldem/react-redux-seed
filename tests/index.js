import isEmpty from 'lodash/isEmpty';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import TestUtils from 'react-addons-test-utils';
import { configureProdStore as configureStore } from '../app/middlewares';


export function getRenderedComponent(component = {}, state = {}) {
  return ReactDOM.findDOMNode(renderComponent(component, state));
}

export function renderComponent(component = {}, state = {}) {
  if (!isEmpty(state)) {
    const store = Object.assign({}, { user: { name: '', email: '' }}, state);
    const provider = TestUtils.renderIntoDocument(<Provider store={ configureStore(store) }>{ component }</Provider>);
    return TestUtils.findRenderedComponentWithType(provider, component.type).getWrappedInstance();
  }
  return TestUtils.renderIntoDocument(component);
};
