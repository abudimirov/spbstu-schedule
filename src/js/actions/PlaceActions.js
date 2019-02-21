var api = require('../midleware/api');
var REQUEST_PLACE = 'REQUEST_PLACE';
var FETCH_PLACE = 'FETCH_PLACE';
var FAIL_PLACE = 'FAIL_PLACE';

function fetchPlace(buildingId, placeId, date) {
    let endpoint = `buildings/${buildingId}/rooms/${placeId}/scheduler`;
    if (date) {
        endpoint = `${endpoint}?date=${date}`;
    }

    return {
        callApi: {
            types: [REQUEST_PLACE, FETCH_PLACE, FAIL_PLACE],
            endpoint
        }
    }
}

module.exports = {
    fetchPlace: function(buildingId, placeId, date) {
        return function(dispatch) {
            return dispatch(fetchPlace(buildingId, placeId, date));
        };
    }
};
