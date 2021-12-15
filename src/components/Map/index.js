import React, { useEffect } from 'react';
import './mapStyles.css'
import maplibregl from 'maplibre-gl';
import { connect } from 'react-redux'

const myAPIKey = '8f29ca4faadf42c6aa352315c93dc662';
const mapStyle = 'https://maps.geoapify.com/v1/styles/osm-liberty/style.json';

const Map = ({coordinates}) => {
    let mapContainer;

    useEffect(() => {
        const initialState = {
            lng: coordinates.lng,
            lat: coordinates.lat,
            zoom: 17
        };

        const map = new maplibregl.Map({
            container: mapContainer,
            style: `${mapStyle}?apiKey=${myAPIKey}`,
            center: [initialState.lng, initialState.lat],
            zoom: initialState.zoom
        });
        var airportIcon = document.createElement('div');
        airportIcon.classList.add("marker");
        map.addControl(new maplibregl.NavigationControl(), 'bottom-left');
        new maplibregl.Marker(airportIcon, {
            anchor: 'bottom',
            offset: [0, 6]
        })
            .setLngLat([initialState.lng, initialState.lat])
            .addTo(map);
    }, [coordinates, mapContainer]);


    return (
        <div id="map" ref={el => mapContainer = el}>
        </div>
    )
}

const mapStateToProps = state => {
    return {
      coordinates: state.coordinates.coordinates
    }
  }

export default connect(mapStateToProps, null)(Map)