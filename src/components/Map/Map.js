import React, { useEffect } from 'react';
import './mapStyles.css'
import maplibregl from 'maplibre-gl';
import { connect } from 'react-redux'

const myAPIKey = '8f29ca4faadf42c6aa352315c93dc662';
const mapStyle = 'https://maps.geoapify.com/v1/styles/osm-liberty/style.json';

const Map = ({ coordinates, buildings }) => {
    let mapContainer

    useEffect(() => {
        let markerIcon = null
        let initialState = {}
        if (coordinates == null) {
            initialState = {
                lng: 24.940594677145064,
                lat: 60.171545300000005,
                zoom: 2
            }
        } else {
            initialState = {
                lng: coordinates.lng,
                lat: coordinates.lat,
                zoom: 17
            }
        }
        //create map
        const map = new maplibregl.Map({
            container: mapContainer,
            style: `${mapStyle}?apiKey=${myAPIKey}`,
            center: [initialState.lng, initialState.lat],
            zoom: initialState.zoom
        });
        if (coordinates != null) {
            markerIcon = document.createElement('div');
            markerIcon.classList.add("markerCheckBuilding");
            new maplibregl.Marker(markerIcon, {
                anchor: 'bottom',
                offset: [0, 6],
                title: 'ok'
            })
                .setLngLat([coordinates.lng, coordinates.lat])
                .addTo(map);
        }
        //create marker
        if (buildings.length > 0) {
            for (let i = 0; i < buildings.length; i++) {
                markerIcon = document.createElement('div');
                markerIcon.classList.add("marker");
                new maplibregl.Marker(markerIcon, {
                    anchor: 'bottom',
                    offset: [0, 6],
                })
                    .setLngLat([buildings[i].lon, buildings[i].lat])
                    .setPopup(new maplibregl.Popup({ offset: 25 }).setHTML(`
                    <h2>Building name</h2>
                    <p>${buildings[i].name}</p>
                    <h2>Address</h2>
                    <p>${buildings[i].street + ' ' + buildings[i].housenumber + ', ' + buildings[i].city + ', ' + buildings[i].postcode}</p>
                    <h2>Description:</h2>
                    <p>${buildings[i].description}</p>
                        `))
                    .addTo(map);
            }
        }
        //create controlles
        map.addControl(new maplibregl.NavigationControl(), 'bottom-left');
    }, [coordinates, buildings, mapContainer]);


    return (
        <div id="map" ref={el => mapContainer = el}>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        coordinates: state.coordinates.coordinates,
        buildings: state.buildings.buildings
    }
}

export default connect(mapStateToProps, null)(Map)