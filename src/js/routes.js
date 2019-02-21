'use strict';
var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    IndexRoute = Router.IndexRoute,
    App = require('./containers/App'),
    FacultyList = require('./components/FacultyList.jsx'),
    Faculty = require('./components/Faculty.jsx'),
    Schedule = require('./components/Schedule.jsx'),
    Teacher = require('./components/Teacher.jsx'),
    TeacherListFilter = require('./components/TeacherListFilter.jsx'),
    TeacherListSearch = require('./components/TeacherListSearch.jsx'),
    GroupListSearch = require('./components/GroupListSearch.jsx'),
    ScheduleGridView = require('./components/Print/ScheduleGridView.jsx').routerWrapper,
    Place = require('./components/Place.jsx');

const pathEnum = {
        faculties: '/',
        groups: '/faculty/:facultyId/groups',
        groupScheduleDefault: '/faculty/:facultyId/groups/:groupId',
        groupSchedule: '/faculty/:facultyId/groups/:groupId?date=:date',
        groupSchedulePdf: '/faculty/:facultyId/groups/:groupId/pdf',
        groupSchedulePrint: '/faculty/:facultyId/groups/:groupId/print',
        groupScheduleCal: '/faculty/:facultyId/groups/:groupId/ical',
        //teacherList: '/teachers',
        teacherScheduleDefault: '/teachers/:teacherId',
        teacherSchedule: '/teachers/:teacherId?date=:date',
        teacherSchedulePrint: '/teachers/:teacherId/print',
        teacherSchedulePdf: '/teachers/:teacherId/pdf',
        teacherScheduleCal: '/teachers/:teacherId/ical',
        placeScheduleDefault: '/places/:buildingId/:placeId',
        placeSchedule: '/places/:buildingId/:placeId?date=:date',
        searchTeacher: '/search/teacher(?q=:q)',
        searchGroup: '/search/groups(?q=:q)'
};


// renderPdf: custom params for server side pdf rendering
/* renderPdf = {
    redirect: route-pattern, link to url which will be rendered to pdf
    pageSize: string, for possible values see pdf.js
    fileName: name for resulting pdf
}
*/

var routes = (
    <Route path={pathEnum.faculties} component={App}>
        <IndexRoute component={FacultyList} />
        <Route path={pathEnum.groups} component={Faculty} />
        
        <Route path={pathEnum.groupScheduleDefault} component={Schedule} />
        <Route path={pathEnum.groupSchedule} component={Schedule} />
        <Route path={pathEnum.groupSchedulePrint} component={ScheduleGridView} />
        <Route path={pathEnum.groupSchedulePdf} renderPdf={{redirect: pathEnum.groupSchedulePrint, pageSize: '297mm*210mm'}} />
        <Route path={pathEnum.groupScheduleCal} renderCal='GroupCal' />
        
        <Route path={pathEnum.teacherSchedulePrint} component={ScheduleGridView} />
        <Route path={pathEnum.teacherSchedulePdf} renderPdf={{redirect: pathEnum.teacherSchedulePrint, pageSize: '297mm*210mm'}} />
        <Route path={pathEnum.teacherScheduleDefault} component={Teacher} />
        <Route path={pathEnum.teacherSchedule} component={Teacher} />
        <Route path={pathEnum.teacherScheduleCal} renderCal='TeacherCal' />
        
        <Route path={pathEnum.placeScheduleDefault} component={Place} />
        <Route path={pathEnum.placeSchedule} component={Place} />
        
        {/*<Route path={pathEnum.teacherList} component={TeacherListFilter} />*/}
        <Route path={pathEnum.searchTeacher} component={TeacherListSearch} />
        <Route path={pathEnum.searchGroup} component={GroupListSearch} />
    </Route>
);

module.exports = { routes, pathEnum };
