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