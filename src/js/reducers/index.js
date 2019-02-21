'use strict';
var redux = require('redux');
var _ = require('lodash');
import { routerStateReducer } from 'redux-router';

function faculties(state, action) {
    var baseState = {
        isFetching: false,
        data: null,
        errors: null
    };
    state = _.extend(baseState, state);

    switch (action.type) {
        case 'REQUEST_FACULTIES':
            state.isFetching = true;
            return state;
        case 'FETCH_FACULTIES':
            state.data = action.response.faculties;
            state.isFetching = false;
            return state;
        case 'FAIL_FACULTIES':
            state.errors = action.errors;
            state.isFetching = false;
            return state;
        default :
            return state;
    }
}

function groups(state, action) {
    var baseState = {
        isFetching: false,
        data: null,
        faculty: null,
        errors: null
    };
    state = _.extend(baseState, state);

    switch (action.type) {
        case 'REQUEST_GROUPS':
            state.isFetching = true;
            return state;
            break;
        case 'FETCH_GROUPS':
            state.isFetching = false;
            state.data = state.data || {};
            state.data[action.response.faculty.id] = action.response.groups;
            state.faculty = action.response.faculty;
            return state;
        case 'FAIL_GROUPS':
            state.errors = action.errors;
            state.isFetching = false;
            return state;
        default :
            return state;
    }
}

function lessons(state, action) {
    var baseState =  {
        isFetching: false,
        data: null,
        group: null,
        week: null,
        errors: null
    };
    state = _.extend(baseState, state);

    switch (action.type) {
        case 'REQUEST_LESSONS':
            state.isFetching = true;
            return state;
        case 'FETCH_LESSONS':
            state.data = state.data || {};
            state.data[action.response.group.id] = action.response.days;
            state.group = action.response.group;
            state.week = action.response.week;
            state.isFetching = false;
            return state;
        case 'FAIL_LESSONS':
            state.errors = action.errors;
            state.isFetching = false;
            return state;
        default :
            return state;
    }
}

function weeks(state, action) {
    var baseState =  {
        isFetching: false,
        data: null,
        errors: null
    };
    state = _.extend(baseState, state);

    switch (action.type) {
        case 'REQUEST_GROUP_WEEK':
        case 'REQUEST_TEACHER_WEEK':
            state.isFetching = true;
            return state;
        case 'FETCH_GROUP_WEEK':
            state.data = _.cloneDeep(state.data)
            _.setWith(state, ['data', 'groups', action.response.group.id, 'weeks', action.response.week.date_start], {
                week: action.response.week,
                days: action.response.days
            }, Object)
            _.set(state, ['data', 'groups', action.response.group.id, 'group'], action.response.group)

            return state;
        case 'FETCH_TEACHER_WEEK':
            state.data = _.cloneDeep(state.data)
            _.setWith(state, ['data', 'teachers', action.response.teacher.id, 'weeks', action.response.week.date_start], {
                week: action.response.week,
                days: action.response.days
            }, Object)
            _.set(state, ['data', 'teachers', action.response.teacher.id, 'teacher'], action.response.teacher)

            return state;
        case 'FAIL_GROUP_WEEK':
        case 'FAIL_TEACHER_WEEK':
            state.errors = action.errors;
            state.isFetching = false;
            return state;
        case 'STOP_GROUP_WEEK_FETCHING':
        case 'STOP_TEACHER_WEEK_FETCHING':
            state.isFetching = false;
            return state;
        default :
            return state;
    }
}

function teacherSchedule(state, action) {
    var baseState = {
            isFetching: false,
            teacher: null,
            data: null,
            week: null,
            errors: null
        };
    state = _.extend(baseState, state);

    switch (action.type) {
        case 'REQUEST_TEACHER_SCHEDULE':
            state.isFetching = true;
            return state;
        case 'FETCH_TEACHER_SCHEDULE':
            state.data = state.data || {};
            state.data[action.response.teacher.id] = action.response.days;
            state.teacher = action.response.teacher;
            state.week = action.response.week;
            state.isFetching = false;
            return state;
        case 'FAIL_TEACHER_SCHEDULE':
            state.errors = action.errors;
            state.isFetching = false;
            return state;
        default :
            return state;
    }
}

function teachers(state, action) {
    var baseState = {
            isFetching: false,
            data: null,
            errors: null
        };
    state = _.extend(baseState, state);

    switch (action.type) {
        case 'REQUEST_TEACHERS_LIST':
            state.isFetching = true;
            return state;
        case 'FETCH_TEACHERS_LIST':
            state.data = _.chain(action.response.teachers)
                .sortBy('full_name')
                .filter(function(teacher) {
                    return teacher.full_name !== "00"
                })
                .value();
            state.isFetching = false;
            return state;
        case 'FAIL_TEACHERS_LIST':
            state.errors = action.errors;
            state.isFetching = false;
            return state;
        default :
            return state;
    }
}

function places(state, action) {
    var baseState = {
            isFetching: false,
            data: null,
            place: null,
            week: null,
            errors: null
        };
    state = _.extend(baseState, state);

    switch (action.type) {
        case 'REQUEST_PLACE':
            state.isFetching = true;
            return state;
        case 'FETCH_PLACE':
            state.data = state.data || {};
            state.data[action.response.room.id] = action.response.days;
            state.place = action.response.room;
            state.week = action.response.week;
            state.isFetching = false;
            return state;
        case 'FAIL_PLACE':
            state.errors = action.errors;
            state.isFetching = false;
            return state;
        default :
            return state;
    }
}

function groupTypeFilter(state, action) {
    var baseState = {
        groupTypeFilter: 'common',
        educationTypeFilter: '0'
    };
    state = _.extend(baseState, state);

    switch (action.type) {
        case 'SET_GROUPTYPE_FILTER':
            state.groupTypeFilter = action.filter;
            return state;
        case 'SET_EDUCATION_FILTER':
            state.educationTypeFilter = action.filter;
            return state;
        default :
            return state;
    }
}

function searchGroup(state, action) {
    var baseState = {
            isFetching: false,
            data: null,
            errors: null
        };
    state = _.extend(baseState, state);

    switch (action.type) {
        case 'REQUEST_GROUP_SEARCH':
            state.isFetching = true;
            return state;
        case 'FETCH_GROUP_SEARCH':
            state.data = _.chain(action.response.groups)
                .sortBy('name')
                .value();
            state.isFetching = false;
            return state;
        case 'FAIL_GROUP_SEARCH':
            state.errors = action.errors;
            state.isFetching = false;
            return state;
        default :
            return state;
    }
}

function searchTeacher(state, action) {
    var baseState = {
            isFetching: false,
            data: null,
            errors: null
        };
    state = _.extend(baseState, state);

    switch (action.type) {
        case 'REQUEST_TEACHER_SEARCH':
            state.isFetching = true;
            return state;
        case 'FETCH_TEACHER_SEARCH':
            state.data = _.chain(action.response.teachers)
                .sortBy('first_name')
                .value();
            state.isFetching = false;
            return state;
        case 'FAIL_TEACHER_SEARCH':
            state.errors = action.errors;
            state.isFetching = false;
            return state;
        default :
            return state;
    }
}


const rootReducer = redux.combineReducers({
    faculties,
    groups,
    lessons,
    weeks,
    teacherSchedule,
    places,
    teachers,
    searchGroup,
    searchTeacher,
    persist: groupTypeFilter,
    router: routerStateReducer
});

export default rootReducer;
