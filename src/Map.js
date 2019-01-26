import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const handleApiLoaded = (map, maps) => {
    map.addListener('bounds_changed', () => console.log(map.getBounds()))
    map.setMapTypeId('satellite');
};

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    static defaultProps = {
        center: {
            lat: 20,
            lng: 30.33
        },
        zoom: 1
    };


    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '50%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyAAqUoeiOiuU030h7mx-n5l5yxbQHNk_fQ'}}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                >
                </GoogleMapReact>
            </div>
        );
    }


}

export default Map;
