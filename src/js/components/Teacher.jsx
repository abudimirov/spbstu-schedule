var React = require('react');
var _ = require('lodash');
var reactRedux = require('react-redux');
var actions = require('../actions/TeacherActions');
var Day = require('./Schedule/Day.jsx');
var Week = require('./Schedule/Week.jsx');
var Pager = require('./Schedule/Pager.jsx');
var LessonsList = require('./Schedule/LessonsList.jsx');
var du = require('../utils/date')

var Teacher = React.createClass({
    componentWillMount: function () {
        var teacherId = parseInt(this.props.params.teacherId, 10);
        var location = this.props.location;
        this.date = location.query && location.query.date;

        if (! this.props.teacher || this.props.teacher.id !== teacherId) {
            this.props.dispatch(actions.fetchTeacherSchedule(teacherId, this.date));
        }
    },

    componentDidUpdate: function() {
        var teacherId = this.props.params.teacherId;
        var location = this.props.location;
        var date = location.query && location.query.date;

        if (this.date !== date) {
            this.date = date;
            this.props.dispatch(actions.fetchTeacherSchedule(teacherId, this.date));
        }
    },

    render: function() {
        var teacherId = parseInt(this.props.params.teacherId, 10);
        var lessons = this.props.lessons && this.props.lessons[teacherId];
        var teacher = this.props.teacher;
        var week = this.props.week;
        var pagerLink = `/teachers/${teacherId}`;

        if (this.props.isFetching) {
            return (
                <div className="schedule-page">
                    <div>Данные загружаются...</div>
                </div>
            )
        }

        if (! teacher || ! week) {
            return (
                <div className="schedule-page">
                    <div>Данные загружаются...</div>
                </div>
            )
        }

        return (
            <div className="schedule-page">
                <a href={`/teachers/${teacher.id}/print?date=${du.qString(du.getWeek(week.date_start))}`} className="printBtn">
                    <i className="fa fa-th" /> Сетка
                </a>
                <a href={`/teachers/${teacher.id}/ical?date=${du.qString(du.getWeek(week.date_start))}`} className="printBtn">
                    <i className="fa fa-calendar" /> iCal
                </a>
                <a href={`/teachers/${teacher.id}/pdf?date=${du.qString(du.getWeek(week.date_start))}`} className="printBtn">
                    <i className="fa fa-print" /> Печать
                </a>

                <h2 className="page__h2">{teacher.full_name}</h2>

                <Week week={week} />

                <Pager week={week} link={pagerLink} />

                <LessonsList lessons={lessons} />

                <Pager week={week} link={pagerLink} />
            </div>
        )
    }
});

Teacher.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    isFetching: React.PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isFetching: state.teacherSchedule.isFetching,
        teacher: state.teacherSchedule.teacher,
        lessons: state.teacherSchedule.data,
        week: state.teacherSchedule.week
    }
}

module.exports = reactRedux.connect(mapStateToProps)(Teacher);
