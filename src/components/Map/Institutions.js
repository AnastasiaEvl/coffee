import React from "react";
// import star from "../icons/mainPage/star.svg";
// import nav from "../icons/mainPage/nav.svg";

export default function Institution({item}) {
    return (
        // <div style={{ width: '90%',
        //     marginTop: '8px'}}>
        <>

            {item.map((i, index) => (
                <div
                    style={{
                        width: "100%",
                        height: "136px",
                        backgroundImage: `url(${i.img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        marginLeft: "20px",
                        borderRadius: "10px",
                        marginTop: "20px",
                        position: "relative",
                    }}
                    key={index}
                >
                    <div className="institutionInfoContainer">
                        {/*<div>*/}
                        {/*    <img src={i.logo} className="institutionLogo" alt='img'/>*/}
                        {/*</div>*/}
                        <div style={{marginLeft:'20px'}}>
                            <div className='institutionAddress'>{i.address}</div>
                            <div className="institutionInfo">
                                <div className="institutionStar">
                                </div>
                                <div className="institutionNav">
                                    {/*<div>*/}
                                    {/*    <img src={nav} alt="img" />*/}
                                    {/*</div>*/}
                                    <div  className="text">{i.distance} km</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );

}
