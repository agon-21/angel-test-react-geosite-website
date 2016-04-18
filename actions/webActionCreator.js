import WebConstants from '../constants/webConstants.js'
import WebDispatcher from '../dispatcher/webDispatcher.js'
import * as CitiesGateway from '../gateways/citiesGateway.js'

let ActionTypes = WebConstants.ActionTypes;

export default {
    getCities: function() {
        console.log('OK getCities');
        CitiesGateway.getAllCities(function (err, res) {
            WebDispatcher.dispatch({
                type: ActionTypes.GET_CITIES,
                cities: res.cities
            });
        })
    },

    getCitysBusinesses: function (city) {
        CitiesGateway.getCitysBusinesses(city, function (err, res) {
            console.log('OK get business');
            WebDispatcher.dispatch({
                type: ActionTypes.GET_BUSINESSES,
                city: city,
                businesses: res.businesses
            });
        })
    },

    updateBusinessAddress: function (businessId, newAddress, city) {
        CitiesGateway.updateBusinessAddress(businessId, newAddress, city, function (err, res) {
            console.log('OK update business');
            WebDispatcher.dispatch({
                type: ActionTypes.BUSINESS_UPDATED,
                businessId: businessId,
                newAddress: newAddress
            });
        })
    },

    deleteBusiness: function (businessId) {
        CitiesGateway.deleteBusiness(businessId, function (err, res) {
            console.log('OK, delete business');
            WebDispatcher.dispatch({
                type: ActionTypes.BUSINESS_DELETED,
                businessId: businessId
            });
        })
    }
}