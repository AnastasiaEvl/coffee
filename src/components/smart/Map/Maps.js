import {useEffect, useRef} from "react";
import mapboxgl from '!mapbox-gl'
import markers from './map.module.css'
import {useNavigate} from "react-router-dom";
import {openModal} from "../../../redux/modal/modalSlice";
import {useAppDispatch} from "../../../core/hooks/useRedux";
import {BackButton} from "../../UI/BackButton";


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
    const navigate = useNavigate()
    const dispatch = useAppDispatch()


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
                    label: "N.Tesla 26",
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
                    label: "К.Marksa 17",
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
                    label: "Belgradskaya 5",
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
                    label: "av.Mira 1",
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
                    label: "Belgradskaya 4",
                },
            },
        ],
    };

    function addMarkers() {
        for (const marker of stores.features) {
            const el = document.createElement("div");
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
                localStorage.setItem('cafe-location',JSON.stringify(marker.properties.label))
                dispatch(openModal('The location is chosen'));
                setTimeout(() => {
                    navigate('/basket')
                }, 4300);

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
        <>
        <BackButton/>
            <div ref={mapContainer} style={{ width: "100%", height: offset < 175 ? "271px": '100px', transition:'0.3s', marginLeft:'1rem',
            marginTop: '4rem', borderRadius: '2rem'}}></div>
        </>
    );
}

export default Maps;
