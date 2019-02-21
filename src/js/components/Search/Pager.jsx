var React = require('react');
var Teacher = require('./Teacher.jsx');
var _ = require('lodash');

var PagerNav = React.createClass({
    propTypes: {
        totalPages: React.PropTypes.number.isRequired,
        page: React.PropTypes.number.isRequired,
        onPageChanged: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            page: 0,
            totalPages: 0,
            onPageChanged: newPage => null
        }
    },

    handlePrevBtn: function() {
        this.props.onPageChanged(this.props.page - 1)
    },
    handleNextBtn: function() {
        this.props.onPageChanged(this.props.page + 1)
    },

    render: function () {
        let total = this.props.totalPages
        let page = this.props.page
        if (total <= 1) return;

        return (
            <div className="pager">
                <button type='button' disabled={page == 0} onClick={this.handlePrevBtn}>
                    <i className="fa fa-arrow-circle-left"></i>
                </button>
                <span className="pager__text">{(page + 1) + ' / ' + total}</span>
                <button type='button' disabled={page == total - 1} onClick={this.handleNextBtn}>
                    <i className="fa fa-arrow-circle-right"></i>
                </button>
            </div>
        );
    }
})


var Pager = React.createClass({
    propTypes: {
        itemsPerPage: React.PropTypes.number,
    },

    getDefaultProps: function() {
        return {
            itemsPerPage: 30,
        }
    },

    componentWillReceiveProps: function() {
        this.setState({page: 0})
    },

    getInitialState: function() {
        return {
            page: 0
        }
    },

    render: function () {
        const page = this.state.page
        const perPage = this.props.itemsPerPage
        const items = React.Children.toArray(this.props.children)
        const total = Math.ceil(items.length / perPage)

        if (items.length > 0 && items.length <= perPage) {
            return (
                <ul className='search-result'>
                    {items}
                </ul>
            )
        } else if (items.length > perPage) {
            return (
                <div>
                    <ul className='search-result'>
                        {_.slice(items, page * perPage, (page + 1) * perPage)}
                    </ul>
                    <PagerNav totalPages={total} page={page} onPageChanged={(newPage) => this.setState({page: newPage})} />
                </div>
            );
        }
    }
});

module.exports = Pager;
