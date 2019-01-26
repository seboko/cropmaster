import React from 'react';
import './App.css'
import HelloWorld from './HelloWorld'
import Map from './Map'

const App = () => {
    return (<div className="App"><HelloWorld name="seb" greeting="Servus"/><HelloWorld name="Miruna"/><Map/></div>)
};

export default App;