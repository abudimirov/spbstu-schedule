'use strict';
var React = require('react');
var Link = require('react-router').Link;
var dateUtils = require('../../utils/date');
var createTable = () => {
    let table = []

    // Outer loop to create parent
    for (let i = 0; i < 3; i++) {
        let children = []
        //Inner loop to create children
        for (let j = 0; j < 5; j++) {
            children.push(<div className="switcher__item">
                <Link to={link}
                      query={{date: CustomWeekStart}}
                      className="switcher__link"
                      activeClassName="switcher__link_active">-2 недели</Link>
            </div>)
        }
        //Create the parent and add the children

    }
    return table
}
var Day = React.createClass({


    render: function() {
        let week = this.props.week;
        let ofset = i;
        let nextDate = dateUtils.getNextWeekStartString(week);
        let CustomWeekStart = dateUtils.getCustomWeekStartString(week,ofset);
        let prevDate = dateUtils.getPrevWeekStartString(week);
        let link = this.props.link;

        return (
            <div className="switcher">
                <div className="switcher__item">
                    <Link to={link}
                          query={{date: CustomWeekStart}}
                          className="switcher__link"
                          activeClassName="switcher__link_active">-2 недели</Link>
                </div>
                <div className="switcher__item">
                    <Link to={link}
                          query={{date: prevDate}}
                          className="switcher__link"
                          activeClassName="switcher__link_active">Предыдущая неделя</Link>
                </div>
                <div className="switcher__item">
                    <Link to={link}
                          className="switcher__link"
                          activeClassName="switcher__link_active">{dateUtils.humanDate(week.date_start)} - {dateUtils.humanDate(week.date_end)}</Link>
                </div>
                <div className="switcher__item">
                    <Link to={link}
                          query={{date: nextDate}}
                          className="switcher__link"
                          activeClassName="switcher__link_active">Следующая неделя</Link>
                </div>
            </div>
        )
    }
});

module.exports = Day;
