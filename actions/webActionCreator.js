import WebConstants from '../constants/webConstants.js'
import WebDispatcher from '../dispatcher/webDispatcher.js'
import * as CitiesGateway from '../gateways/citiesGateway.js'

let ActionTypes = WebConstants.ActionTypes;

export default {
    getCities: function() {
        CitiesGateway.getAllCities(function(err, res){
            console.log('OK GET');
            WebDispatcher.dispatch({
                type: ActionTypes.GET_CITIES,
                cities: res.cities
            });
        })
    }
};