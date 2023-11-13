import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import Map from 'react-map-gl';
import {useEffect, useRef, useState} from "react";
import mapboxgl from '!mapbox-gl'
import markers from './map.module.css'



// // Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
// const MAPBOX_TOKEN = 'pk.eyJ1IjoiYW5hc3Rhc2lhZXZsIiwiYSI6ImNsb3Z0OTBlcjB4eHMya3F3a3I3amQxam8ifQ.ayw3O_KQq7HkpdrGgMH5-Q'



mapboxgl.accessToken =
    "pk.eyJ1IjoiYW5hc3Rhc2lhZXZsIiwiYSI6ImNsb3Z0OTBlcjB4eHMya3F3a3I3amQxam8ifQ.ayw3O_KQq7HkpdrGgMH5-Q";
let map;

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
/* eslint import/no-webpack-loader-syntax: off */
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
function Maps(props) {
    const mapContainer = useRef(null);
    const {offset, getLocations} = props
    const [filterOpen, setFilterOpen] = useState(false);

    const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    });
    useEffect(() => {

        map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",
            // style: "mapbox://styles/yauhenicrop/cksefw6lk8w7917peka1csh32",
            center: [27.552993989345826, 53.90561911012786],
            zoom: 14,
        });

        addMarkers();
        map.addControl(
            new mapboxgl.NavigationControl({
                showCompass: false,
            })
        );
        map.addControl(geolocate);
        map.on("load", () => {
            geolocate.trigger()
            map.addSource("places", {
                type: "geojson",
                data: stores,
            });



            geolocate.on("geolocate",(e)=>getLocations(e.coords));
        });
        map.on("click", (event) => {
            /* Determine if a feature in the "locations" layer exists at that point. */
            const features = map.queryRenderedFeatures(event.point, {
                layers: ["locations"],
            });
            if (!features.length) return;

            const clickedPoint = features[0];
            flyToStore(clickedPoint);

            const activeItem = document.getElementsByClassName("active");
            if (activeItem[0]) {
                activeItem[0].classList.remove("active");
            }
        });

        // Add the control to the map.

        //eslint-disable-next-line
    }, []);

    const stores = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [27.55360877128241,53.86920453819636],
                },
                properties: {
                    phoneFormatted: "(202) 234-7336",
                    // phone: "2022347336",
                    // address: "1471 P St NW",
                    // city: "Washington DC",
                    // country: "United States",
                    // crossStreet: "at 15th St NW",
                    // postalCode: "20005",
                    // state: "D.C.",
                    label: "Н.Теслы 26",
                },
            },
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [27.554300798048054, 53.89852234163179],
                },
                properties: {
                    phoneFormatted: "(202) 507-8357",
                    // phone: "2025078357",
                    // address: "2221 I St NW",
                    // city: "Washington DC",
                    // country: "United States",
                    // crossStreet: "at 22nd St NW",
                    // postalCode: "20037",
                    // state: "D.C.",
                    label: "К.Маркса 17",
                },
            },
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [27.54333425862814, 53.87103753279246],
                },
                properties: {
                    phoneFormatted: "(202) 387-9338",
                    // phone: "2023879338",
                    // address: "1512 Connecticut Ave NW",
                    // city: "Washington DC",
                    // country: "United States",
                    // crossStreet: "at Dupont Circle",
                    // postalCode: "20036",
                    // state: "D.C.",
                    label: "Белградская 5",
                },
            },
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [27.54984336931489, 53.87097871726512],
                },
                properties: {
                    phoneFormatted: "(202) 337-9338",
                    // phone: "2023379338",
                    // address: "3333 M St NW",
                    // city: "Washington DC",
                    // country: "United States",
                    // crossStreet: "at 34th St NW",
                    // postalCode: "20007",
                    // state: "D.C.",
                    label: "пр.Мира 1",
                },
            },
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [27.541810897897005, 53.87128593152572],
                },
                properties: {
                    phoneFormatted: "(202) 547-9338",
                    // phone: "2025479338",
                    // address: "221 Pennsylvania Ave SE",
                    // city: "Washington DC",
                    // country: "United States",
                    // crossStreet: "btwn 2nd & 3rd Sts. SE",
                    // postalCode: "20003",
                    // state: "D.C.",
                    label: "Белградская 4",
                },
            },
        ],
    };

    function addMarkers() {
        for (const marker of stores.features) {
            const el = document.createElement("div");
            console.log(el)
            const divText = document.createElement("div");
            divText.className = `${markers.containerName}`;
            const text = document.createTextNode(marker.properties.label);
            divText.appendChild(text);
            el.id = `marker-${marker.properties.id}`;
            el.className = `${markers.marker}`;
            new mapboxgl.Marker(el, { offset: [0, -23] })
                .setLngLat(marker.geometry.coordinates)
                .addTo(map);
            new mapboxgl.Marker(divText, { offset: [0, -23] })
                .setLngLat(marker.geometry.coordinates)
                .addTo(map);
            el.addEventListener("click", (e) => {
                flyToStore(marker);
                const activeItem = document.getElementsByClassName("active");
                e.stopPropagation();
                if (activeItem[0]) {
                    activeItem[0].classList.remove("active");
                }
                const listing = document.getElementById(
                    `listing-${marker.properties.id}`
                );
                listing.classList.add("active");
            });
        }
    }
    function flyToStore(currentFeature) {
        map.flyTo({
            center: currentFeature.geometry.coordinates,
            zoom: 15,
        });
    }
    stores.features.forEach(function (store, i) {
        store.properties.id = i;
    });

    return (
            <div ref={mapContainer} style={{ width: "100%", height: offset < 175 ? "271px": '100px', transition:'0.3s'}}></div>
    );
}

export default Maps;
