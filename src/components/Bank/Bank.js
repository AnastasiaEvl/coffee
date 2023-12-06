import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";


export const Bank = () => {
    const [number, SetNumber] = useState("");
    const [name, SetName] = useState("");
    const [month, SetMonth] = useState("");
    let [expiry, SetExpiry] = useState("");
    const [cvc, SetCvc] = useState("");
    const [focus, SetFocus] = useState("");
    const handleDate = (e) => {
        SetMonth(e.target.value);
        SetExpiry(e.target.value);
    };
    const handleExpiry = (e) => {
        SetExpiry(month.concat(e.target.value));
    };

    return (
        <>


            <div className="credit card">
                <Cards
                    number={number}
                    name={name}
                    expiry={expiry}
                    cvc={cvc}
                    focused={focus}
                />
            </div>

            <br />
            <form>
                <div className="row">
                    <div className="card number part">
                        <label>Card Number</label>
                        <input
                            type="tel"
                            className="form-control"
                            value={number}
                            name="number"
                            pattern="[0-9]+"
                            onChange={(e) => {
                                SetNumber(e.target.value);
                            }}
                            onFocus={(e) => SetFocus(e.target.name)}
                        ></input>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="card name part">
                        <label>Card Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            name="name"
                            placeholder="card holder"
                            onChange={(e) => {
                                SetName(e.target.value);
                            }}
                            onFocus={(e) => SetFocus(e.target.name)}
                        ></input>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div
                        className="cvc part"
                        style={{
                            ...{ "padding-right": "12em" },
                            ...{ "padding-left": "1em" }
                        }}
                    >
                        <label >Expiration Date</label>
                    </div>
                    <div className="cvv info">
                        <label >CVV</label>
                    </div>
                </div>

                <div className="row">
                    <div className="card name info">
                        <select
                            className="form-control"
                            name="expiry"
                            onChange={handleDate}
                        >
                            <option value=" ">Month</option>
                            <option value="January">01</option>
                            <option value="February">02</option>
                            <option value="March">03</option>
                            <option value="April">04</option>
                            <option value="May">05</option>
                            <option value="June">06</option>
                            <option value="July">07</option>
                            <option value="August">08</option>
                            <option value="September">09</option>
                            <option value="October">10</option>
                            <option value="November">11</option>
                            <option value="December">12</option>
                        </select>
                    </div>
                    &nbsp;
                    <div className="expiry date info">
                        <select
                            className="form-control"
                            name="expiry"
                            onChange={handleExpiry}
                        >
                            <option value=" ">Year</option>
                            <option value="19">2019</option>
                            <option value="20">2020</option>
                            <option value="21">2021</option>
                            <option value="22">2022</option>
                            <option value="23">2023</option>
                            <option value="24">2024</option>
                            <option value="25">2025</option>
                            <option value="26">2026</option>
                            <option value="27">2027</option>
                            <option value="28">2028</option>
                            <option value="29">2029</option>
                            <option value="30">2030</option>
                        </select>
                    </div>
                    <div className="cvc info">
                        <input
                            type="int"
                            name="cvc"
                            className=" form-control card"
                            value={cvc}
                            pattern="\d*"
                            onChange={(e) => {
                                SetCvc(e.target.value);
                            }}
                            onFocus={(e) => SetFocus(e.target.name)}
                        ></input>
                    </div>
                </div>
                <br />
                <input
                    type="submit"
                    className="btn btn-secondary form-control"
                    value="Submit"
                />
            </form>
        </>
    );
};

