import keyMirror from 'keyMirror';

export default {
    ActionTypes: keyMirror({
        GET_CITIES: null,
        GET_BUSINESSES: null,
        BUSINESS_UPDATED: null,
        BUSINESS_DELETED: null
    })
};