var _ = require('lodash');
var ical = require('ical-generator')
var moment = require('moment-timezone');

var Cal = class {
    constructor(req, res, state) {
        this.state = state
        this.req = req
        this.res = res
    }
    
    serve() {
        this.ical().serve(this.res)
    }
    
    ical() {
        return ical({
            domain: this.req.get('host'),
            name: this.getName(),
            prodId: {company: 'spbstu.ru', product: 'ical', language: 'RU'},
            timezone: 'Europe/Moscow',
            // url: this.req.protocol + '://' + this.req.get('host') + this.req.url,
            // ttl: 60 * 60 * 24 * 7,
            events: this.getEvents()
        })
    }
    
    getEvents() {
        return _.map(this.getLessons(), l => this.lessonEvent(l))
    }
    
    getLessons() {
        var week = this.getWeek()
        if(!week) return [];
        var data = this.getData();
        if(!data) return [];
        
        var lessons = _.flatMap(data, day =>
            _.map(day.lessons, lesson => {lesson.weekday = day.weekday; lesson.week = week; return lesson} )
        )
        lessons = _.sortBy(lessons, ['weekday', 'time_start'])
        return lessons
    }
    
    
    lessonEvent(lesson) {
        return {
            start: this.dateFor(lesson, lesson.time_start),
            end: this.dateFor(lesson, lesson.time_end),
            summary: lesson.subject,
            description: '',
            location: this.placeName(lesson.auditories[0])
        }
    }
    
    placeName(place) {
        if(!place) return '';
        var building = place.building.abbr || ''
        return building + ' ' + place.name
    }
    
    dateFor(lesson, time) {
        return moment.tz(lesson.week + ' ' + time, 'YYYY.MM.DD HH:mm', 'Europe/Moscow')
            .day(lesson.weekday)
            .toDate()
    }
    
    getData() {throw 'should be implemented'}
    getWeek() {throw 'should be implemented'}
    getName() {throw 'should be implemented'}
}

var GroupCal = class extends Cal {
    getData() {
        var groupId = _.get(this.state, ['lessons', 'group', 'id'])
        if(!groupId) return null;
        var data = _.get(this.state, ['lessons', 'data', groupId])
        if(!data || data.length == 0) return null;
        return data
    }
    
    getWeek() {
        return _.get(this.state, ['lessons', 'week', 'date_start'])
    }
    
    getName() {
        var group = this.state.lessons.group
        return 'Расписание группы ' + group.name
    }
}

var TeacherCal = class extends Cal {
    getData() {
        var teacherId = _.get(this.state, ['teacherSchedule', 'teacher', 'id'])
        if(!teacherId) return null;
        var data = _.get(this.state, ['teacherSchedule', 'data', teacherId])
        if(!data || data.length == 0) return [];
        return data
    }
    
    getWeek() {
        return _.get(this.state, ['teacherSchedule', 'week', 'date_start'])
    }
    
    getName() {
        return 'Расписание'
    }
}

module.exports = {GroupCal, TeacherCal}