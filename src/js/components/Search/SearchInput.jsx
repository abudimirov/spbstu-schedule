var React = require('react');
var _ = require('lodash');

var SearchInput = React.createClass({
    propTypes: {
        placeholder: React.PropTypes.string,
        onChange: React.PropTypes.func,
        onSubmit: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            onChange: newFilter => null,
            onSubmit: newFilter => null,
            placeholder: ''
        }
    },

    getInitialState: function() {
        return {value: ''};
    },

    handleInput: function(e) {
        const text = e.target.value
        this.setState({value: text})
        this.props.onChange(text)
    },
    handleSubmit: function(e) {
        this.props.onSubmit(this.state.value)
        e.preventDefault()
    },

    render: function() {
        return (
            <form className='search-area' onSubmit={this.handleSubmit}>
                <span className='search-area__title'>Поиск:</span>
                <input className='search-area__input' type="text" value={this.state.value} onChange={this.handleInput} placeholder={this.props.placeholder} />
                <button className='search-area__button' type='submit' ><i className="fa fa-search" /></button>
                <div className='search-type'></div>
            </form>
        )
    }
});

module.exports = SearchInput
