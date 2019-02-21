var React = require('react');
var _ = require('lodash');
var reactRedux = require('react-redux');
var actions = require('../actions/SearchActions');
var Link = require('react-router').Link;
var SearchForm = require('./Search/SearchForm.jsx');

var GroupListSearch = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        isFetching: React.PropTypes.bool.isRequired
    },

    componentWillMount: function () {
        if (! this.props.groups) {
            this.props.dispatch(actions.searchGroups(this.props.location.query.q));
        }
    },

    render: function() {
        let groups = this.props.groups;
        let searchResult = ''

        if (this.props.isFetching) {
            searchResult = <div>Данные загружаются...</div>
        } else {
            if (!groups || groups.length === 0) {
                searchResult = <h3>Группы не найдены</h3>
            } else {
                searchResult = (
                    <ul className="groups-list">
                        {groups.map((group) =>
                            <li key={group.id} className="groups-list__item">
                                <Link to={`/faculty/${group.faculty.id}/groups/${group.id}`}
                                    className="groups-list__link">{group.name}</Link>
                            </li>
                        )}
                    </ul>
                )
            }
        }

        return (
            <div className="schedule-page">
                <SearchForm init_searchString={this.props.location.query.q} init_searchType='group'/>
                <h3>Результат поиска:</h3>
                {searchResult}
            </div>
        )
    }
});

function mapStateToProps(state) {
    return {
        isFetching: state.searchGroup.isFetching,
        groups: state.searchGroup.data
    }
}

module.exports = reactRedux.connect(mapStateToProps)(GroupListSearch);
