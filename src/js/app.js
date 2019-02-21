require('es6-shim');

var React = require('react'),
    render = require('react-dom').render,
    Root = require('./containers/Root');

import { reduxReactRouter } from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';

import { createMainStore } from './store/mainStore';

require('es6-promise').polyfill();

const initialState = window['__INITIAL_STATE__'];

const store = createMainStore(reduxReactRouter, createHistory, initialState);

render(<Root store={store} />,
    document.getElementById('rootPageContainer')
);
