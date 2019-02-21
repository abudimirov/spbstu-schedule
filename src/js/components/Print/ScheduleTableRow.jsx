var React = require('react');
var _ = require('lodash');
var Cell = require('./Cell.jsx');

var Time = React.createClass({
    render: function() {
        return <td className='time_td' rowSpan='2'>{this.props.value}</td>;
    }
})

function canMerge(a, b) {
    if(!a && !b) return true
    if(!a || !b) return false
    if(a.length != b.length) return false

    return _.isEqualWith(a, b, function(a_lessons, b_lessons) {
        var sortedALessons = _.sortBy(a_lessons, 'subject')
        var sortedBLessons = _.sortBy(b_lessons, 'subject')
        return _.every(_.map(sortedALessons, (xx, i) => _.isEqualWith(sortedALessons[i], sortedBLessons[i], canMergeLesson)))
    })
}

function canMergeLesson(x, y) {
    return x.short_name === y.short_name && x.type === y.type &&
        _.isEqual(_.sortBy(x.teachers, 'full_name'), _.sortBy(y.teachers, 'full_name')) &&
        _.isEqual(_.sortBy(x.auditories, 'name'), _.sortBy(y.auditories, 'name'))
}

function mergeSubgroupsIfPossible(lessons) {
    var canMerge = _.every(lessons, a => {
        var b = lessons[0]
        return a.subject === b.subject && a.typeObj.name === b.typeObj.name
    })
    if (lessons.length > 1 && canMerge) {
        return [_.reduce(lessons, mergeSubgroups)]
    } else {
        markTeachersAndGroupsWithSubgroup(lessons)
        return lessons
    }
}

function markTeachersAndGroupsWithSubgroup(lessons) {
    _.forEach(lessons, l => {
        _.forEach(l.teachers, t => t.subgroup = l.additional_info)
        _.forEach(l.groups, g => g.subgroup = l.additional_info)
    })
}

function mergeSubgroups (a, b) {
    a.teachers = _.unionBy(a.teachers, b.teachers, 'id')
    a.auditories = _.unionBy(a.auditories, b.auditories, 'id')
    return a
}

function mergeGroupsForTeacherIfPossible(lessons) {
    var canMerge = _.every(lessons, a => {
        var b = lessons[0]
        return a.subject === b.subject && a.typeObj.name === b.typeObj.name && _.isEqual(a.auditories, b.auditories)
    })
    if (lessons.length > 1 && canMerge) {
        return [_.reduce(lessons, mergeGroupsForTeacher)]
    } else {
        return lessons
    }
}

function mergeGroupsForTeacher(a, b) {
    a.groups = _.unionBy(a.groups, b.groups, 'id')
    return a
}

function getRows(lessonsEven, lessonsOdd, time, showGroups) {
    lessonsEven = lessonsEven || []
    lessonsOdd = lessonsOdd || []

    lessonsEven = _.groupBy(lessonsEven, 'weekday')
    lessonsOdd = _.groupBy(lessonsOdd, 'weekday')

    if(showGroups) {
        lessonsEven = _.mapValues(lessonsEven, x => mergeGroupsForTeacherIfPossible(x))
        lessonsOdd = _.mapValues(lessonsOdd, x => mergeGroupsForTeacherIfPossible(x))
    } else {
        lessonsEven = _.mapValues(lessonsEven, x => mergeSubgroupsIfPossible(x))
        lessonsOdd = _.mapValues(lessonsOdd, x => mergeSubgroupsIfPossible(x))
    }

    var odd_cells = _.times(6, i => <Cell key={i} lessons={lessonsOdd[i + 1]} merge={canMerge(lessonsOdd[i + 1], lessonsEven[i + 1])} showGroups={showGroups} />)
    var even_cells = _.map(odd_cells, (c, i) => {
        if (c.props.merge) {
            return null
        } else {
            return <Cell key={7 + i} lessons={lessonsEven[i + 1]} even showGroups={showGroups} />
        }
    })
    even_cells = _.filter(even_cells, _.isObject)
    
    var odd_row = <tr key={time + 'odd'}>
        <Time value={time} />
        <td className='week_td'>I</td>
        {odd_cells}
    </tr>
    var even_row = <tr key={time + 'even'}>
        <td className='week_td even_week'>II</td>
        {even_cells}
    </tr>
    return [odd_row, even_row]
};

module.exports = getRows;