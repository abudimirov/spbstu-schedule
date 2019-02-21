var React = require('react');
var reactRedux = require('react-redux');
var actions = require('../actions/SearchActions');
var TeachersList = require('./Search/TeachersList.jsx');
var SearchForm = require('./Search/SearchForm.jsx');

var TeacherListSearch = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        isFetching: React.PropTypes.bool.isRequired
    },

    componentWillMount: function () {
        if (! this.props.teachers) {
            this.props.dispatch(actions.searchTeachers(this.props.location.query.q));
        }
    },

    render: function() {
        let teachers = this.props.teachers;
        let searchResult = ''

        if (this.props.isFetching) {
            searchResult = <div>Данные загружаются...</div>
        } else {
            if (!teachers || teachers.length === 0) {
                searchResult = <h3>Преподаватели не найдены</h3>
            } else {
                searchResult = <TeachersList teachers={teachers} />
            }
        }

        return (
            <div className="schedule-page">
                <SearchForm init_searchString={this.props.location.query.q} init_searchType='teacher' />
                <h3>Результат поиска:</h3>
                {searchResult}
            </div>
        )
    }
});

function mapStateToProps(state) {
    return {
        isFetching: state.searchTeacher.isFetching,
        teachers: state.searchTeacher.data
    }
}

module.exports = reactRedux.connect(mapStateToProps)(TeacherListSearch);
