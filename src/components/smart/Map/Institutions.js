import React from "react";
import map from './map.module.css'

export default function Institution({item}) {
    return (
        <>
            {item.map((i, index) => (
                <div className={map.mainContainer}
                    key={index}
                >
                    <div className={map.institutionInfoContainer}>
                        <div style={{marginLeft:'20px'}}>
                            <div className={map.institutionAddress}>{i.address}</div>
                            <div className={map.institutionInfo}>
                                <div className={map.institutionNav}>
                                    <div  className={map.text}>{i.distance} km</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );

}
