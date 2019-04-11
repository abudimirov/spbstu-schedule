'use strict';
var React = require('react');
var reactRedux = require('react-redux');
var actions = require('../actions/FacultyActions');


const groupTypes = {
    common: "Очная",
    evening: "Очно-заочная",
    distance: "Заочная"
}

var GroupTypeLink = React.createClass({
    getDefaultProps: function() {
        return {
            active: false
        };
    },

    render: function() {
        return (
            <a href="javascript:;" className={this.props.active ? 'active' : '' } onClick={() => this.props.onClick(this.props.filter)} >
                {this.props.displayName}
            </a>
        );
    }
})
GroupTypeLink.propTypes = {
    filter: React.PropTypes.oneOf(Object.keys(groupTypes)).isRequired,
    active: React.PropTypes.bool,
    displayName: React.PropTypes.string,
    onClick: React.PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.persist.groupTypeFilter
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(actions.setGroupTypeFilter(ownProps.filter))
        }
    }
}

GroupTypeLink = reactRedux.connect(mapStateToProps, mapDispatchToProps)(GroupTypeLink);



var GroupTypes = React.createClass({
    render: function() {
        return (
            <ul className="tabbed-area__tabs">
                {Object.keys(groupTypes).map((groupType) =>
                    <li key={groupType}>
                        <GroupTypeLink filter={groupType} displayName={groupTypes[groupType]} />
                    </li>
                )}
            </ul>
        )
    }
});
GroupTypes.propTypes = {
    filter: React.PropTypes.oneOf(Object.keys(groupTypes)).isRequired,
}

GroupTypes = reactRedux.connect(
    (state, ownProps) => ({
        filter: state.persist.groupTypeFilter
    })
)(GroupTypes);

module.exports = GroupTypes