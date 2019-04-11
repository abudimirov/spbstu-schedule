'use strict';
var moment = require('moment');
var _ = require('lodash');

require('moment/locale/ru');

moment.locale('ru');

const commonTime = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00']

function getPrevWeekStart(week) {
    if (! week) {
        throw new Error('Argument week should be passed');
    }

    var dateArray = week.date_start.split('.');
    var prevWeekStartDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
    prevWeekStartDate.setHours(-24 * 7);

    return prevWeekStartDate;
}

function getNextWeekStart(week) {
    if (! week) {
        throw new Error('Argument week should be passed');
    }

    var dateArray = week.date_end.split('.');
    var nextWeekStartDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
    nextWeekStartDate.setHours(24);

    return nextWeekStartDate;
}

function dateToString(date) {
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
}

function getPrevWeekStartString(week) {
    var prevWeekStartDate = getPrevWeekStart(week);

    return dateToString(prevWeekStartDate);
}

function getNextWeekStartString(week) {
    var nextWeekStartDate = getNextWeekStart(week);

    return dateToString(nextWeekStartDate);
}

function humanDate(date) {
    return moment(date, "YYYY.MM.DD").format("DD MMMM");
}


function getWeek(str) {
    if(str) {
        return moment(str, ['YYYY-M-D', 'YYYY.MM.DD'])
    } else {
        return moment().startOf('week')
    }
}

function qString(m) {
    return m.format('YYYY-M-D')
}

function dString(m) {
    return m.format('YYYY.MM.DD')
}

function startCommon(string) {
    return _.includes(commonTime, string)
}

function endCommon(startString, endString) {
    return moment(startString, 'HH:mm').add(90, 'minutes').format('HH:mm') === endString
}

function nearestCommonTime(string) {
    var startTime = moment(string, 'HH:mm')
    var result = _.find(commonTime, x => moment(x, 'HH:mm').isSameOrAfter(startTime))
    
    return result
}

module.exports = {
    getNextWeekStart: getNextWeekStart,
    getNextWeekStartString: getNextWeekStartString,
    getPrevWeekStart: getPrevWeekStart,
    getPrevWeekStartString: getPrevWeekStartString,
    humanDate: humanDate,
    getWeek,
    qString,
    dString,
    startCommon,
    endCommon,
    nearestCommonTime
};
