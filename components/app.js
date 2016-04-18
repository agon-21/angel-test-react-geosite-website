import React from 'react';
import async from 'async';
import WebActionCreator from '../actions/webActionCreator.js'
import CityStore from '../stores/cityStore.js'

class App extends React.Component {

    componentDidMount() {
        WebActionCreator.getCities();
        CityStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        CityStore.removeChangeListener(this._onChange);
    }

    _onClick() {
        if (this.state.cities) {
            async.each(this.state.cities, function(city, callback) {
                WebActionCreator.getCitysBusinesses(city);
                callback();
            }, function (err){
                if( err ) {
                    console.log('An error has occured');
                } else {
                    console.log('Successful');
                }
            })
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            initial: "Madrid"
        };
        this._onChange = this._onChange.bind(this);
        this._getStateFromStore = this._getStateFromStore.bind(this);
        this._onHover = this._onHover.bind(this);
        this._onClick = this._onClick.bind(this);
        this._updateBusinessAddress = this._updateBusinessAddress.bind(this);
        this._deleteBusiness = this._deleteBusiness.bind(this);
    }

    _getStateFromStore () {
        return {
            cities: CityStore.getAllCities(),
            businesses: CityStore.getBusinesses()
        }
    }

    //Event handler for 'change' events coming from the stores
    _onChange() {
        this.setState(this._getStateFromStore());
    }

    _onHover(city) {
        WebActionCreator.getCitysBusinesses(city);
    }

    _updateBusinessAddress (businessId, newAddress) {
        WebActionCreator.updateBusinessAddress(businessId, newAddress);
    }

    _deleteBusiness (businessId, city) {
        WebActionCreator.deleteBusiness(businessId, city);
    }

    render() {
        let cities = [];
        let businesses = [];
        if(this.state.cities) {
            cities = this.state.cities.map(city => {
                return (
                    <div>
                        <h1 onMouseOver={() => this._onHover(city)}>{city}</h1>
                    </div>)
            });
        }

        if (this.state.businesses) {
            businesses = this.state.businesses.map(business => {
                return (
                    <div>
                        <h1 onClick = {() => this._deleteBusiness(business.id)}>{business.name}</h1>
                        <h1 onClick = {() => this._updateBusinessAddress(business.id, 'Angel', 'Paris')}>{business.address}</h1>
                    </div>)
            });
        }

        return(
            <div>
                <h1>Hello APP</h1>
                <h2>{this.props.business}</h2>
                <button onClick={this._onClick}>Click</button>
                {cities}
                {businesses}
            </div>
        )
    }
}

export default App;