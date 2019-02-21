var React = require('react');
var _ = require('lodash');
var moment = require('moment');
var du = require('../../utils/date')
var Link = require('react-router').Link;

var subgroupName = function(subgroup) {
    var commonMatch = subgroup.match(/[пП]\/[гГ]\s*\d+/g)
    if (commonMatch === null) {
        return null
    } else {
        return commonMatch[0]
    }
}

var Teachers = React.createClass({
    teacherName: function(teacher) {
        var result = teacher.first_name + ' ' + _.first(teacher.middle_name) + '.'
        if(teacher.last_name && teacher.last_name.length > 0) {
            result = result + ' ' + _.first(teacher.last_name) + '.'
        }
        if(teacher.subgroup && subgroupName(teacher.subgroup)) {
            result = result + ' (' + subgroupName(teacher.subgroup) + ')'
        }
        return result
    },

    render: function() {
        var teachers = this.props.value
        if(!teachers || teachers.length == 0) return <div className='teacher' />;

        return <ul className='teacher'>
            {_.map(teachers, t => <li key={this.teacherName(t)}>
                <Link to={`/teachers/${t.id}/print`}>
                    {this.teacherName(t)}
                </Link>
            </li>)}
        </ul>
    }
})

var Groups = React.createClass({
    groupName: function(group) {
        var result = group.name
        if(group.subgroup && subgroupName(group.subgroup)) {
            result = result + ' (' + subgroupName(group.subgroup) + ')'
        }
        return result
    },

    render: function() {
        var groups = this.props.value
        if(!groups || groups.length == 0) return <div className='teacher' />;

        if(this.props.additional == "Поток") {
            return <div className='teacher'>Поток</div>
        }
        return <ul className='teacher'>
            {_.map(groups, (g, i) => <li key={i}>
                <Link to={`/faculty/${g.faculty.id}/groups/${g.id}/print`}>
                    {this.groupName(g)}
                </Link>
            </li>)}
        </ul>
    }
})

var Place = React.createClass({
    placeName: function(place) {
        var building = place.building.abbr || ''
        var result = building + ' ' + place.name
        return result
    },

    sizeClass: function(placeName) {
        if (placeName.length > 16) {
            return 'small_place'
        } else {
            return null
        }
    },

    render: function() {
        var places = this.props.value
        if(!places || places.length == 0) return <div className='place' />;

        return <ul className='place'>
            {_.map(places, p => {
                var placeName = this.placeName(p)
                var sizeClass = this.sizeClass(placeName)
                return <li className={sizeClass} key={placeName}>
                    <Link to={`/places/${p.building.id}/${p.id}`}>
                        {placeName}
                    </Link>
                </li>
            })}
        </ul>
    }
})

var Time = React.createClass({
    render: function() {
        var start = this.props.startTime
        var end = this.props.endTime
        if(du.startCommon(start) && du.endCommon(start, end)) {
            return null
        } else {
            return <div className='uncommon_time'>с {start} по {end}</div>
        }
    }
})

var Subject = React.createClass({
    render: function() {
        return <div className='subject' >{this.props.name}</div>
    }
})


var Lesson = React.createClass({
    render: function() {
        var lesson = this.props.lesson
        return <div className='row'>
            <div className='cell' style={this.props.style}>
                <Subject name={lesson.subject_short} />
                <Time startTime={lesson.time_start} endTime={lesson.time_end} />
                {this.props.showGroups ? <Groups value={lesson.groups} additional={lesson.additional_info} /> : <Teachers value={lesson.teachers} />}
                <div className='type'>{lesson.typeObj.abbr}</div>
                <Place value={lesson.auditories} />
            </div>
        </div>
    }
})

var Cell = React.createClass({
    weekClass: function() {
        if(this.props.even) {
            return 'even_week'
        }
        return null
    },

    render: function () {
        var lessons = this.props.lessons
        if(!lessons || lessons.length == 0) return <td rowSpan={this.props.merge ? '2' : null}>&nbsp;</td>;

        return <td className={this.weekClass()} rowSpan={this.props.merge ? '2' : null}>
            <div className='lessons'>
                {_.map(lessons, (l, i) => <Lesson key={i} lesson={l} showGroups={this.props.showGroups} />)}
            </div>
        </td>
    }
});

module.exports = Cell;
