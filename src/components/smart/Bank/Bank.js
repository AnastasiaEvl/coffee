import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import bank from './bank.module.css'
import {openModal} from "../../../redux/modal/modalSlice";
import {useAppDispatch} from "../../../core/hooks/useRedux";
import {useNavigate} from "react-router-dom";
import useInput from "../../../core/hooks/UseValidation";
import {Input} from "../../UI/Input";
import {BackButton} from "../../UI/BackButton";

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

    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const handlerBankCard = (e) => {
        e.preventDefault()
        const paymentInf = {
            number, name, month, expiry, cvc
        }
        localStorage.removeItem('basket')
        dispatch(openModal('Payment received'));
        navigate('/main')

    }
    const numbers = useInput(number, {isEmpty: true, minLengthBankCard: 16, maxLengthBankCard: 16});
    const cvcNum = useInput(cvc, {isEmpty: true, cvcMinLength: 3, cvcMaxLength: 3})
    const nameHolder = useInput(name, {isEmpty: true})
    const expiryDate = useInput(expiry, {isEmpty: true})
    const monthDate = useInput(month, {isEmpty: true})


    return (
        <div className={bank.mainContainer}>
            <BackButton/>
            <div className={bank.card}>
                <Cards
                    number={number}
                    name={name}
                    expiry={expiry}
                    cvc={cvc}
                    focused={focus}
                />
            </div>
            <form className={bank.formContainer}>
                <div className="row">
                    <div>
                        <label className={bank.label}>Card Number</label>
                        <Input
                            type="number"
                            className="form-control"
                            placeholder='Card Number'
                            name="number"
                            pattern="[0-9]+"
                            onBlur={e => numbers.onBlur(e)}
                            onChange={(e) => {
                                SetNumber(e.target.value);
                            }}
                            onFocus={(e) => SetFocus(e.target.name)}
                        ></Input>
                        {(numbers.isDirty && numbers.isEmpty) && (
                                <p>Empty field</p>
                            ) ||
                            ((numbers.isDirty && numbers.maxLengthBankCard) || (numbers.isDirty && numbers.minLengthBankCard)) && (
                                <p>The length must be 16 numbers</p>
                            )}

                    </div>
                </div>
                <div className="row">
                    <div>
                        <label className={bank.label}>Card Name</label>
                        <Input
                            type="text"
                            className="form-control"
                            value={name}
                            name="name"
                            onBlur={e => nameHolder.onBlur(e)}
                            placeholder="Card Holder"
                            onChange={(e) => {
                                SetName(e.target.value);
                            }}
                            onFocus={(e) => SetFocus(e.target.name)}
                        ></Input>
                        {(nameHolder.isDirty && nameHolder.isEmpty) && (
                            <p>Empty field</p>
                        )}
                    </div>
                </div>
                <label className={bank.label}>Expiration Date</label>
                <label className={bank.label}>CVV</label>
                <div className="row">
                    <div>
                        <select
                            className="form-control"
                            name="expiry"
                            onChange={handleDate}
                            onBlur={e => monthDate.onBlur(e)}
                        >
                            <option value={month}>Month</option>
                            <option value="01">January</option>
                            <option value="02">February</option>
                            <option value="03">March</option>
                            <option value="04">April</option>
                            <option value="05">May</option>
                            <option value="06">June</option>
                            <option value="07">July</option>
                            <option value="08">August</option>
                            <option value="09">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                        {(monthDate.isDirty && monthDate.isEmpty) && (
                            <p>Empty field</p>
                        )}
                        <br/>
                    </div>

                    <div className="expiry date info">
                        <select
                            className="form-control"
                            name="expiry"
                            onChange={handleExpiry}
                            onBlur={e => expiryDate.onBlur(e)}
                        >
                            <option value={expiry}>Year</option>
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
                        {(expiryDate.isDirty && expiryDate.isEmpty) && (
                            <p>Empty field</p>
                        )}
                    </div>

                    <div className="cvc info">
                        <label className={bank.label}>CVC</label>
                        <br/>
                        <Input
                            type="int"
                            placeholder='CVC'
                            name="cvc"
                            onBlur={e => cvcNum.onBlur(e)}
                            className=" form-control card"
                            value={cvc}
                            minLength={3}
                            maxLength={3}
                            pattern="\d*"
                            onChange={(e) => {
                                SetCvc(e.target.value);
                            }}
                            onFocus={(e) => SetFocus(e.target.name)}
                        ></Input>
                        {(cvcNum.isDirty && cvcNum.isEmpty) && (
                                <p>Empty field</p>
                            ) ||
                            ((cvcNum.isDirty && cvcNum.cvcMaxLength) || (cvcNum.isDirty && cvcNum.cvcMinLength)) && (
                                <p>The length must be 3 numbers</p>
                            )}
                    </div>
                </div>
                <br/>
                <input
                    type="submit"
                    className="btn btn-secondary form-control"
                    value="Submit"
                    onClick={(e) => handlerBankCard(e)}
                    disabled={Boolean((number && name && month && expiry && cvc) === '')}
                />

            </form>
        </div>
    );
};

