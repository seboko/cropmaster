import React, { Component } from 'react';
import Map from "./Map";

export default class MapWrapper extends Component {

    render() {
        if (this.props.gmaps) {
            console.log("Wrapper:");
            console.log(this.props);
            return (<Map submitSelection={this.props.submitSelection}/>)
        } else {
            return (<div></div>)
        }
    }

}

