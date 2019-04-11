'use strict';
var React = require('react');
var Link = require('react-router').Link;
var SearchForm = require('./Search/SearchForm.jsx');

var Header = React.createClass({
    render: function() {
        return (
            <header className="page__header">
                    <div className="row">
                        <div className="col-sm-12 col-md-4">
                            <a href="/" className="logo page__logo">
                                <img src="/img/logo.svg"
                                     alt="Политехнический университет Петра Великого"
                                     className="logo__img"></img>
                            </a>
                        </div>
                        <div className="col-sm-12 col-md-8">
                            <SearchForm />
                        </div>
                    </div>
            </header>
        )
    }
});

module.exports = Header;
