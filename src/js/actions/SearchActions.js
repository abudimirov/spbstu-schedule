var api = require('../midleware/api');
var REQUEST_TEACHERS_LIST = 'REQUEST_TEACHERS_LIST';
var FETCH_TEACHERS_LIST = 'FETCH_TEACHERS_LIST';
var FAIL_TEACHERS_LIST = 'FAIL_TEACHERS_LIST';
var REQUEST_TEACHER_SEARCH = 'REQUEST_TEACHER_SEARCH';
var FETCH_TEACHER_SEARCH = 'FETCH_TEACHER_SEARCH';
var FAIL_TEACHER_SEARCH = 'FAIL_TEACHER_SEARCH';
var REQUEST_GROUP_SEARCH = 'REQUEST_GROUP_SEARCH';
var FETCH_GROUP_SEARCH = 'FETCH_GROUP_SEARCH';
var FAIL_GROUP_SEARCH = 'FAIL_GROUP_SEARCH';


function fetchTeachersList() {
    let endpoint = `teachers`;

    return {
        callApi: {
            types: [REQUEST_TEACHERS_LIST, FETCH_TEACHERS_LIST, FAIL_TEACHERS_LIST],
            endpoint
        }
    }
}

function searchTeachers(searchString) {
    searchString = encodeURIComponent(searchString)
    let endpoint = `search/teachers?q=${searchString}`;

    return {
        callApi: {
            types: [REQUEST_TEACHER_SEARCH, FETCH_TEACHER_SEARCH, FAIL_TEACHER_SEARCH],
            endpoint
        }
    }
}


function searchGroups(searchString) {
    searchString = encodeURIComponent(searchString)
    let endpoint = `search/groups?q=${searchString}`;

    return {
        callApi: {
            types: [REQUEST_GROUP_SEARCH, FETCH_GROUP_SEARCH, FAIL_GROUP_SEARCH],
            endpoint
        }
    }
}


module.exports = {
    fetchTeachersList: function() {
        return function(dispatch) {
            return dispatch(fetchTeachersList());
        };
    },

    searchTeachers: function(searchString) {
        return function(dispatch) {
            return dispatch(searchTeachers(searchString));
        };
    },

    searchGroups: function(searchString) {
        return function(dispatch) {
            return dispatch(searchGroups(searchString));
        };
    }
};
