var React = require('react');
var Teacher = require('./Teacher.jsx');
var Pager = require('./Pager.jsx');
var _ = require('lodash');

var TeachersList = React.createClass({
    render: function () {
        let teachers = this.props.teachers;

        if (teachers && teachers.length > 0) {
            return (
                <Pager itemsPerPage={15} >
                    {teachers.map(teacher => 
                        <Teacher teacher={teacher} key={teacher.id} />
                    )}
                </Pager>
            )
        } else {
            return <h3>Ничего не найдено</h3>
        }
    }
});

module.exports = TeachersList;
