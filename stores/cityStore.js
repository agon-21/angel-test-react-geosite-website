import WebDispatcher from '../dispatcher/webDispatcher';
import WebConstants from '../constants/webConstants';
import EventEmitter from 'events';
import assign from 'object-assign';

let ActionTypes = WebConstants.ActionTypes;
let CHANGE_EVENT = 'change';

let _cities = [];
let _businesses = [];

class CityStore extends EventEmitter {

    constructor() {
        super()
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    /**
     * @param {function} callback
     */
    addChangeListener (callback) {
        this.on(CHANGE_EVENT, callback);
    }

    /**
     * @param {function} callback
     */
    removeChangeListener (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    get (cityName) {
        return _cities[cityName];
    }

    getAllCities () {
        return _cities;
    }

    getBusinesses () {
        return _businesses
    }
}

let CityStoreInstance = new CityStore();

CityStoreInstance.dispatchToken = WebDispatcher.register(action => {

    switch (action.type) {
        case ActionTypes.GET_CITIES:
            _cities = action.cities;
            CityStoreInstance.emitChange();
            break;
        case ActionTypes.GET_BUSINESSES:
            _businesses = action.businesses;
            CityStoreInstance.emitChange();
            break;
        case ActionTypes.BUSINESS_UPDATED:
            for (var b in _businesses) {
                if (_businesses[b].id = action.businessId) {
                    _businesses[b].address = action.newAddress;
                }
            }
            CityStoreInstance.emitChange();
            break;
        case ActionTypes.BUSINESS_DELETED:
            for (var b in _businesses) {
                if (_businesses[b].id = action.businessId) {
                    _businesses.splice(b, 1);;
                }
            }
            CityStoreInstance.emitChange();
            break;
        default:
        // do nothing
    }
});

export default CityStoreInstance;