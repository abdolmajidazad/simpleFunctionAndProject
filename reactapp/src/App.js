import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    start = {
        list: []
    }

    getData = function () {

        fetch("https://restcountries.eu/rest/v2/all", {
            method: "GET"
        }).then(function (response) {
            if(response.ok){
                console.log(response.json().then(resp=>resp))
            }

        }).catch(error => {

        })

    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default App;
