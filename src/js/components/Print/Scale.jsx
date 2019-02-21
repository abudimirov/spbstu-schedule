var React = require('react');
var ReactDOM = require('react-dom')
var _ = require('lodash');
var reactRedux = require('react-redux');
var actions = require('../../actions/FacultyActions');
var LessonsTablePdf = require('../Print/LessonsTablePdf.jsx');
var du = require('../../utils/date')

var Scale = React.createClass({
    render: function() {
        return <div>
            React.Children.toArray(this.props.children)
        </div>
    },

    componentDidUpdate: function() {
        var node = ReactDOM.findDOMNode(this)
        if(!node) return;

        var height = node.getBoundingClientRect().height
        var width = node.getBoundingClientRect().width
        if(height > this.props.heightLimit) {
            var scale = limit / height
            node.style.transformOrigin = '0 0';
            node.style.webkitTransformOrigin = '0 0';
            node.style.transform = 'scale(' + scale + ')';
            node.style.webkitTransform = 'scale(' + scale + ')';

            node.style.width = ((1.0 / scale) * 100) + '%';
            node.parentNode.style.height = height * scale + 'px'
        }
    },

    propTypes: {
        heightLimit: React.PropTypes.number.isRequired // all children will be scaled to this limit (in pixels)
    }
});

module.exports = {component: ScheduleGroupTable, routerWrapper: RouterWrapper};
