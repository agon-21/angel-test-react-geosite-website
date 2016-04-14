import React from 'react';
import WebActionCreator from '../actions/webActionCreator.js'
import CityStore from '../stores/cityStore.js'

class App extends React.Component {
    componentDidMount() {
        //WebActionCreator.getCities();
        CityStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        CityStore.removeChangeListener(this._onChange);
    }

    _onClick() {
        WebActionCreator.getCities();
    }

    //_onChange() {
    //    console.log('Store is changed')
    //}

    constructor(props) {
        super(props);
        this.state = {
            initial: "Madrid"
        };
        this._onChange = this._onChange.bind(this);
        this._getStateFromStore = this._getStateFromStore.bind(this);
    }

    _getStateFromStore () {
        return {
            cities: CityStore.getAllCities()
        }
    }

    //Event handler for 'change' events coming from the stores
    _onChange() {
        console.log('State ' + this.state);
        this.setState(this._getStateFromStore());
    }

    render() {
        return(
            <div>
                <h1>Hello APP</h1>
                <h2>{this.state.initial}</h2>
                <h2>{this.props.business}</h2>
                <button onClick={this._onClick}>Click</button>
                <h3>{this.state.cities}</h3>
            </div>
        )
    }
}

export default App;