'use strict';
var fetch = require('isomorphic-fetch');
var _ = require('lodash');

function callApiFactory(root) {
    var API_ROOT =  root || 'https://ruz.spbstu.ru/api/v1/ruz/';

    return function(endpoint) {
        var fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

        return fetch(fullUrl)
            .then(function(response) {
                return response.json();
            });
    }
}

export {callApiFactory as callApiFactory};

export default store => next => action => {
    if (action.callApi === undefined) {
        return next(action);
    }
    const callAPI = action.callApi;

    let { endpoint } = callAPI;
    const { types } = callAPI;

    function actionWith(data) {
        const finalAction = _.assign({}, action, data);
        delete finalAction['callApi'];
        return finalAction;
    }

    const [requestType, successType, failureType] = types;
    next(actionWith({ type: requestType }));
    let callApi = callApiFactory();

    return callApi(endpoint).then(
        response => next(actionWith({
            response,
            type: successType
        })),
        error => next(actionWith({
            type: failureType,
            error: error.message || 'Не удалось связаться с сервером'
        }))
    );
};
