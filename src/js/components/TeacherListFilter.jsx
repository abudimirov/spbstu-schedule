var React = require('react');
var _ = require('lodash');
var reactRedux = require('react-redux');
var actions = require('../actions/SearchActions');
var TeachersList = require('./Search/TeachersList.jsx');
var SearchInput = require('./Search/SearchInput.jsx');

var TeacherListFilter = React.createClass({
    componentWillMount: function () {
        if (! this.props.teachers) {
            this.props.dispatch(actions.fetchTeachersList());
        }
    },

    getInitialState: function() {
        return {filter: ''};
    },

    handleFilter: function(newFilter) {
        this.setState({filter: newFilter});
    },

    filterTeachers: function(filter) {
        var words = filter.match(/\S+/ig)
        var teachers = this.props.teachers
        if (words.length === 0) return teachers;

        // NB: `first_name` `middle_name` `last_name` fields in teacher json object
        // first_name = actually surname
        // middle_name = actually first name
        // last_name = actually middle name
        // very confusing

        // if only one word in filter then make filter in this particular order: 1) by family 2) by name
        if (words.length === 1) {
            var filteredByFamily = teachers.filter(teacher => teacher.first_name.toLowerCase().indexOf(words[0].toLowerCase()) == 0)
            var filteredByName = teachers.filter(teacher => teacher.middle_name.toLowerCase().indexOf(words[0].toLowerCase()) == 0)

            return _.union(filteredByFamily, filteredByName)
        }

        // many words uses whole name for filter
        return teachers.filter(function(teacher) {
            return _.every(words, word => teacher.full_name.toLowerCase().search(word.toLowerCase()) != -1)
        });
    },

    render: function() {
        let teachers = this.props.teachers;

        if (this.props.isFetching) {
            return (
                <div className="schedule-page">
                    <div>Данные загружаются...</div>
                </div>
            )
        }

        if (! this.props.teachers) {
            return (
                <div className="schedule-page">
                    <div>Данные загружаются...</div>
                </div>
            )
        }

        if (this.state.filter.length > 0) {
            teachers = this.filterTeachers(this.state.filter)
        }

        return (
            <div className="schedule-page">
                <SearchInput onChange={this.handleFilter} placeholder="Введите фамилию" />
                <TeachersList teachers={teachers} />
            </div>
        )
    }
});

TeacherListFilter.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    isFetching: React.PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        isFetching: state.teachers.isFetching,
        teachers: state.teachers.data
    }
}

module.exports = reactRedux.connect(mapStateToProps)(TeacherListFilter);
