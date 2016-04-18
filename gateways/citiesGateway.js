import request from 'superagent'
import config from '../config'

export function getAllCities(callback) {
    request
        .get(config.API_url + '/cities')
        .set('Accept', 'application/json')
        .end(function(err, res){
            if (err || !res.ok) {
                throw new Error(res.error);
            } else {
                callback(null, {cities: res.body})
            }
        });
}

export function getCitysBusinesses(city, callback) {
    request
        .get(config.API_url + '/cities/' + city + '/businesses')
        .set('Accept', 'application/json')
        .end(function(err, res){
            if (err || !res.ok) {
                throw new Error(res.error);
            } else {
                callback(null, {businesses: res.body})
            }
        });
}

export function updateBusinessAddress(businessId, newAddress, city, callback) {
    request
        .put(config.API_url + '/businesses/' + businessId + '/address')
        .send({ newAddress: newAddress, city: city })
        .set('Accept', 'application/json')
        .end(function(err, res){
            if (err || !res.ok) {
                throw new Error(res.error);
            } else {
                callback(null, res)
            }
        });
}

export function deleteBusiness(businessId, callback) {
    request
        .del(config.API_url + '/businesses/' + businessId)
        .set('Accept', 'application/json')
        .end(function(err, res){
            if (err || !res.ok) {
                throw new Error(res.error);
            } else {
                callback(null, res)
            }
        });
}