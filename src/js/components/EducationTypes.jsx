'use strict';
var React = require('react');
var reactRedux = require('react-redux');
var actions = require('../actions/FacultyActions');

const educationTypes = {
    '0': "Бакалавр",
    '1': "Магистр",
    '2': "Специалист",
    //'3': "Аспирант",
    '6': "СПО",
    //'4': "ДПО"
}

var EducationTypeLink = React.createClass({
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
    },
    
    propTypes: {
        filter: React.PropTypes.oneOf(Object.keys(educationTypes)).isRequired,
        active: React.PropTypes.bool,
        displayName: React.PropTypes.string,
        onClick: React.PropTypes.func.isRequired
    }
})

const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.persist.educationTypeFilter
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(actions.setEducationTypeFilter(ownProps.filter))
        }
    }
}

EducationTypeLink = reactRedux.connect(mapStateToProps, mapDispatchToProps)(EducationTypeLink);

var EducationTypes = React.createClass({
    render: function() {
        return (
            <ul className="tabbed-area__tabs">
                {Object.keys(educationTypes).map((educationType) =>
                    <li key={educationType}>
                        <EducationTypeLink filter={educationType} displayName={educationTypes[educationType]} />
                    </li>
                )}
            </ul>
        );
    },
    propTypes: {
        filter: React.PropTypes.oneOf(Object.keys(educationTypes)).isRequired,
    }
});

EducationTypes = reactRedux.connect(
    (state, ownProps) => ({
        filter: state.persist.educationTypeFilter
    })
)(EducationTypes);

module.exports = EducationTypes;

