var api = require('../midleware/api');
var REQUEST_FACULTIES = 'REQUEST_FACULTIES';
var FETCH_FACULTIES = 'FETCH_FACULTIES';
var FAIL_FACULTIES = 'FAIL_FACULTIES';
var REQUEST_GROUPS = 'REQUEST_GROUPS';
var FETCH_GROUPS = 'FETCH_GROUPS';
var FAIL_GROUPS = 'FETCH_GROUPS';
var REQUEST_LESSONS = 'REQUEST_LESSONS';
var FETCH_LESSONS = 'FETCH_LESSONS';
var FAIL_LESSONS = 'FETCH_LESSONS';

function fetchFaculties() {
    return {
        callApi: {
            types: [REQUEST_FACULTIES, FETCH_FACULTIES, FAIL_FACULTIES],
            endpoint: 'faculties'
        }
    }
}

function fetchGroups(groupId) {
    let endpoint = `faculties/${groupId}/groups`;

    return {
        callApi: {
            types: [REQUEST_GROUPS, FETCH_GROUPS, FAIL_GROUPS],
            endpoint
        }
    }
}

function fetchLessons(groupId, date) {
    var endpoint = `scheduler/${groupId}`;

    if (date) {
        endpoint = `${endpoint}?date=${date}`;
    }

    return {
        callApi: {
            types: [REQUEST_LESSONS, FETCH_LESSONS, FAIL_LESSONS],
            endpoint
        }
    }
}

function fetchGroupWeek(groupId, date) {
    var endpoint = `scheduler/${groupId}?date=${date}`;

    return {
        callApi: {
            types: ['REQUEST_GROUP_WEEK', 'FETCH_GROUP_WEEK', 'FAIL_GROUP_WEEK'],
            endpoint
        }
    }
}

function fetchTeacherWeek(teacherId, date) {
    var endpoint = `teachers/${teacherId}/scheduler?date=${date}`;

    return {
        callApi: {
            types: ['REQUEST_TEACHER_WEEK', 'FETCH_TEACHER_WEEK', 'FAIL_TEACHER_WEEK'],
            endpoint
        }
    }
}

function setGroupTypeFilter(filter) {
    return {
        type: 'SET_GROUPTYPE_FILTER',
        filter
    }
}

function setEducationTypeFilter(filter) {
    return {
        type: 'SET_EDUCATION_FILTER',
        filter
    }
}


module.exports = {
    fetchFaculties: function () {
        return function(dispatch) {
            return dispatch(fetchFaculties());
        };
    },

    fetchGroups: function(groupId) {
        return function(dispatch) {
            return dispatch(fetchGroups(groupId));
        };
    },

    fetchLessons: function(facultyId, groupId, date) {
        return function(dispatch) {
            return dispatch(fetchLessons(groupId, date));
        };
    },

    setGroupTypeFilter: function(filter) {
        return function(dispatch) {
            return dispatch(setGroupTypeFilter(filter));
        };
    },
    
    setEducationTypeFilter: function(filter) {
        return function(dispatch) {
            return dispatch(setEducationTypeFilter(filter));
        };
    },

    fetchGroupWeeks: function(groupId, weeks) {
        return function(dispatch) {
            var promises = weeks.map(w => dispatch(fetchGroupWeek(groupId, w)))
            return Promise.all(promises).then(() => dispatch({type: 'STOP_GROUP_WEEK_FETCHING'}))
        }
    },

    fetchTeacherWeeks: function(teacherId, weeks) {
        return function(dispatch) {
            var promises = weeks.map(w => dispatch(fetchTeacherWeek(teacherId, w)))
            return Promise.all(promises).then(() => dispatch({type: 'STOP_TEACHER_WEEK_FETCHING'}))
        }
    }
};
