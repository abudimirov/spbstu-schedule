'use strict';
var React = require('react');
var Provider = require('react-redux').Provider;
var ReduxRouter = require('redux-router').ReduxRouter;

var Root = React.createClass({
    propTypes: {
        store: React.PropTypes.object.isRequired
    },

    render: function() {
        const store = this.props.store;
        const routes = store.getState().router.routes;
        return (
            <Provider store={store} key="provider">
                <ReduxRouter routes={routes} />
            </Provider>
        );
    }
});

module.exports = Root;
