var React = require('react');
var _ = require('lodash');
var reactRedux = require('react-redux');
var actions = require('../actions/FacultyActions');
var Groups = require('./Groups.jsx');
var GroupTypes = require('./GroupTypes.jsx');
var EducationTypes = require('./EducationTypes.jsx');

var Faculty = React.createClass({
    componentWillMount: function () {
        var facultyId = this.props.params.facultyId;

        if (! this.props.groups || ! this.props.groups[ facultyId ]) {
            this.props.dispatch(actions.fetchGroups(facultyId));
        }
    },

    getGroupPart: function (group, part) {
        return parseInt(group.name.split('/')[ part ]);
    },

    getGroupNum: function (group) {
        return this.getGroupPart(group, 0);
    },

    getSubgroupNum: function (group) {
        return this.getGroupPart(group, 1);
    },

    groupGroupsByLevel: function(groups) {
        if (groups) {
            return _.chain(groups)
                .filter(x => this.props.typeFilter === 'all' || x.type === this.props.typeFilter)
                .filter(x => this.props.educationFilter === 'all' || x.kind.toString() === this.props.educationFilter)
                .sortBy('level')
                .orderBy([ this.getGroupNum, this.getSubgroupNum ])
                .groupBy('level')
                .value();
        } else {
            return null;
        }
    },

    render: function () {
        var facultyId = parseInt(this.props.params.facultyId, 10);
        var faculty = this.props.faculty;
        var groups = this.props.groups && this.props.groups[ facultyId ];
        var levels = this.groupGroupsByLevel(groups);

        if (this.props.isFetching && faculty) {
            return (
                <div className="faculty">
                    <h2 className="page__h2">{faculty.name}</h2>
                    <div>Данные загружаются...</div>
                </div>
            )
        }

        if (!faculty) {
            return (
                <div className="faculty">
                    <div>Данные загружаются...</div>
                </div>
            )
        }
        
        
        
        
        return (
            <div className="faculty">
                <h2 className="page__h2">{faculty.name}</h2>
				<div className="breadcrumbs">
						<a href="/"><i className="fa fa-home" aria-hidden="true"></i> Главная</a>
						&nbsp;/&nbsp; 
						<span>{faculty.name}</span>
				</div>
                <div className="tabs-area">
                    <GroupTypes faculty={this.props.facultyId} />
                    <EducationTypes faculty={this.props.facultyId}  />
                    <div className="tabbed-area__pane">
                        <div className="faculty__levels">
                            {
                                (levels && Object.keys(levels).length > 0) ?
                                this.renderLevels(facultyId, levels) :
                                <div className="faculty__level">
                                    <h3 className="body__h3">Группы не найдены</h3>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    },

    renderLevels: function(facultyId, levels) {
        return Object.keys(levels)
            .map(function(level, i) {
                return (
                        <div key={i} className="faculty__level">
                            <h3 className="page__h3">{level} курс</h3>
                            <Groups groups={levels[level]} facultyId={facultyId}/>
                        </div>
                    );
            }
        )
    }

});

Faculty.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    isFetching: React.PropTypes.bool.isRequired,
    typeFilter: React.PropTypes.string.isRequired,
    educationFilter: React.PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        isFetching: state.groups.isFetching,
        faculty: state.groups.faculty,
        groups: state.groups.data,
        typeFilter: state.persist.groupTypeFilter,
        educationFilter: state.persist.educationTypeFilter
    }
}

module.exports = reactRedux.connect(mapStateToProps)(Faculty);
