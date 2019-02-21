var React = require('react');
var getRows = require('./ScheduleTableRow.jsx');
var _ = require('lodash');

var LessonsTablePdf = React.createClass({
    render: function () {
        var data = this.props.lessons
        var even = data.even
        var odd = data.odd

        if(_.isEmpty(data) || (_.isEmpty(even) && _.isEmpty(odd)) ) {
            return <h3 className="page__h3">Занятий нет</h3>
        }

        var hours = _.sortBy(_.union(_.map(even, x => x[0].commonTime), _.map(odd, x => x[0].commonTime)))
        even = _.mapKeys(even, e => e[0].commonTime)
        odd = _.mapKeys(odd, e => e[0].commonTime)

        var rows = _.map(hours, (hour) => {
            return getRows(even[hour], odd[hour], hour, this.props.showGroups)
        })
        rows = _.flatten(rows)
        return (
            <div>
                <table className="schedule-printable">
                <thead>
                    <tr>
                        <th className="time_th">время</th>
                        <th className="week_th">&nbsp;</th>
                        <th>понедельник</th>
                        <th>вторник</th>
                        <th>среда</th>
                        <th>четверг</th>
                        <th>пятница</th>
                        <th>суббота</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
                </table>
            </div>
        )
    }
});

module.exports = LessonsTablePdf;
