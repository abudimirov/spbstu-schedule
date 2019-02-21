'use strict';
var React = require('react');
import { pushState } from 'redux-router'
var Redux = require('react-redux');

var App = React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        pushState: React.PropTypes.func.isRequired
    },

    render: function() {
        const { children } = this.props;

        return (
            <div className="app">
                { children }
            </div>
        )
    }
});

function mapStateToProps(state) {
    return {
        routerState: state.router
    };
}

module.exports = Redux.connect(mapStateToProps, { pushState })(App);
