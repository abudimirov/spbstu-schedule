var React = require('react');

var SearchForm = React.createClass({
    handleSearch: function(e) {
        let searchString = this.state.searchString
        if (searchString.length == 0) return;

        if (this.state.searchType === 'group') {
            window.location.href = '/search/groups?q=' + encodeURIComponent(searchString)
        } else if (this.state.searchType === 'teacher') {
            window.location.href = '/search/teacher?q=' + encodeURIComponent(searchString)
        }
        e.preventDefault()
    },

    getInitialState: function() {
        return {
            searchType: this.props.init_searchType || 'group',
            searchString: this.props.init_searchString || ''
        }
    },

    render: function() {
        return (
            <form className='search-area' onSubmit={this.handleSearch}>
                <span className='search-area__title'>Поиск:</span>
                <input className='search-area__input' type="text" value={this.state.searchString} onChange={e => this.setState({searchString: e.target.value})} />
                <button className='search-area__button' type='submit' ><i className="fa fa-search" /></button>
                <div className='search-type'>
                    <label>
                        <input type='radio' checked={this.state.searchType === 'group'}  onClick={e => this.setState({searchType: 'group'})} readOnly />
                        по группе
                    </label>
                    <label>
                        <input type='radio' checked={this.state.searchType === 'teacher'}  onClick={e => this.setState({searchType: 'teacher'})} readOnly />
                        по преподавателю
                    </label>
                </div>
            </form>
        )
    }
});

module.exports = SearchForm;
