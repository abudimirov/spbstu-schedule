var api = require('../midleware/api');
var REQUEST_TEACHER_SCHEDULE = 'REQUEST_TEACHER_SCHEDULE';
var FETCH_TEACHER_SCHEDULE = 'FETCH_TEACHER_SCHEDULE';
var FAIL_TEACHER_SCHEDULE = 'FAIL_TEACHER_SCHEDULE';

function fetchTeacherSchedule(teacherId, date) {
    let endpoint = `teachers/${teacherId}/scheduler`;
    if (date) {
        endpoint = `${endpoint}?date=${date}`;
    }

    return {
        callApi: {
            types: [REQUEST_TEACHER_SCHEDULE, FETCH_TEACHER_SCHEDULE, FAIL_TEACHER_SCHEDULE],
            endpoint
        }
    }
}

module.exports = {
    fetchTeacherSchedule: function(teacherId, date) {
        return function(dispatch) {
            return dispatch(fetchTeacherSchedule(teacherId, date));
        };
    }
};
