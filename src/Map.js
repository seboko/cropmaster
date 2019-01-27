import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './Map.css'


var drawingManager;

class Map extends Component {

    constructor(props) {
        super(props);
        this.hide = this.hide.bind(this);
        // this.handleApiLoaded = this.handleApiLoaded.bind(this);
    }

    hide() {
        this.setState({showMap: false});
    };

    static defaultProps = {
        center: {
            lat: 20,
            lng: 30.33
        },
        zoom: 1
    };

    handleApiLoaded(map, maps) {
        this.setState({map: map, maps: maps});
        map.setMapTypeId('hybrid');


        drawingManager = new maps.drawing.DrawingManager({
            drawingMode: maps.drawing.OverlayType.MARKER,
            drawingControl: true,
            drawingControlOptions: {
                position: maps.ControlPosition.TOP_CENTER,
                drawingModes: ['rectangle']
            },
            rectangleOptions: {
                fillColor: '#aeff82',
                fillOpacity: 0.2,
                strokeWeight: 1,
                clickable: true,
                editable: true,
                zIndex: 1
            }
        });

        drawingManager.setMap(map);

        maps.event.addListener(drawingManager, 'overlaycomplete', (e) => {
            if (this.state.selection) {
                this.state.selection.setMap(null);
                this.props.submitSelection(null);
            }
            console.log(this.state);
            drawingManager.setDrawingMode(null);
            this.setState({selection: e.overlay});
            console.log('props are');
            console.log(this.props);
            this.props.submitSelection(e.overlay);
            console.log(this.state)
        });


        // Create the search box and link it to the UI element.
        var input = document.getElementById('search');
        var searchBox = new maps.places.SearchBox(input);
        // map.controls[maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
            searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
            var places = searchBox.getPlaces();

            if (places.length === 0) {
                return;
            }

            // Clear out the old markers.
            markers.forEach(function(marker) {
                marker.setMap(null);
            });
            markers = [];

            // For each place, get the icon, name and location.
            var bounds = new maps.LatLngBounds();
            places.forEach(function(place) {
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                var icon = {
                    url: place.icon,
                    size: new maps.Size(71, 71),
                    origin: new maps.Point(0, 0),
                    anchor: new maps.Point(17, 34),
                    scaledSize: new maps.Size(25, 25)
                };

                // Create a marker for each place.
                markers.push(new maps.Marker({
                    map: map,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location
                }));

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });

    }


    render() {
        return (
            // Important! Always set the container height explicitly
            <div className='Map' style={{ height: '92vh'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyAAqUoeiOiuU030h7mx-n5l5yxbQHNk_fQ',
                        libraries: ['drawing', 'places'].join(','),}}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
                >
                </GoogleMapReact>
            </div>
        );

    }


}

export default Map;