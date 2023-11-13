import {useEffect, useState} from "react";
import Maps from "./Maps";
import * as turf from "@turf/turf";
import Institution from "./Institutions";
import mapStyle from './map.module.css'

export const MapCard = () => {

    const [offset, setOffset] = useState(0);
    const [institutionItem, setInstitutionItem] = useState([
        {
            // img: require("../icons/mainPage/map/institutionCard.png"),
            // logo: require("../icons/landing/partners/logo2.png"),
            address: "Минск, ул. Николы Теслы 26",
            rating: "4.8",
            distance: null,
            coordinates: [27.55360877128241,53.86920453819636],
        },
        {
            // img: require("../icons/mainPage/map/institutionCard.png"),
            // logo: require("../icons/landing/partners/logo2.png"),
            address: "Минск, ул. К.Маркса 17",
            rating: "5",
            distance: null,
            coordinates: [27.554300798048054, 53.89852234163179],
        },
        {
            // img: require("../icons/mainPage/map/institutionCard.png"),
            // logo: require("../icons/landing/partners/logo2.png"),
            address: "Минск, Белградская 5",
            rating: "3",
            distance: null,
            coordinates: [27.54333425862814, 53.87103753279246],
        },
        {
            // img: require("../icons/mainPage/map/institutionCard.png"),
            // logo: require("../icons/landing/partners/logo2.png"),
            address: "Минск, пр-т Мира, 1",
            rating: "4.5",
            distance: null,
            coordinates: [27.54984336931489, 53.87097871726512],
        },
        {
            // img: require("../icons/mainPage/map/institutionCard.png"),
            // logo: require("../icons/landing/partners/logo2.png"),
            address: "Минск, Белградская 4",
            rating: "4.6",
            distance: null,
            coordinates: [27.541810897897005, 53.87128593152572],

        },
    ]);

    useEffect(() => {
        const onScroll = () => setOffset(window.pageYOffset);
        // clean up code
        window.removeEventListener("scroll", onScroll);
        window.addEventListener("scroll", onScroll, {passive: true});
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    function getLocations(coordinates) {
        const coord = [coordinates.longitude, coordinates.latitude];
        const newInstitutionItem = [...institutionItem];
        newInstitutionItem.map(i => {
            let from = turf.point(coord);
            let to = turf.point(i.coordinates);
            let options = {units: "kilometers"};
            let distance = turf.distance(from, to, options);
            i.distance = (distance).toFixed(2)
        })

        setInstitutionItem(newInstitutionItem)

    }

    return (
        <div className={mapStyle.mainPageContainer}>
            <div>
            <Maps offset={offset} getLocations={getLocations}/>
            </div>
            <div>
            <Institution item={institutionItem}/>
            </div>
        </div>
    )

}
