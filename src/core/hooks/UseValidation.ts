import {useEffect, useState} from "react";


function useValidation (value:any,validations:any){
    const [isEmpty, setEmpty] = useState<boolean>(true);
    const [minLengthError, setMinLengthError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);
    const [inputValid, setInputValid] = useState<boolean>(false);
    const [minLengthBankCard, setMinLengthBankCard]=useState<boolean>(false)
    const [maxLengthBankCard, setMaxLengthBankCard] = useState<boolean>(false)
    const [cvcMinLength, setCvcMinLength]=useState<boolean>(false)
    const [cvcMaxLength, setCvcMaxLength]=useState<boolean>(false)
    const [passwordCheck, setPasswordCheck]=useState<boolean>(false)
    const [nameCheck,setNameCheck] = useState<boolean>(false)


    useEffect(():void => {
        for (const validation in validations) {
            switch (validation) {
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true);
                    break;
                case 'minLength':
                    value.length < validations[validation]
                        ? setMinLengthError(true)
                        : setMinLengthError(false);
                    break;
                case 'passwordCheck':
                    value !== validations[validation]
                        ? setPasswordCheck(true)
                        : setPasswordCheck(false);
                    break;
                case 'nameCheck':
                    value !== validations[validation]
                        ? setNameCheck(true)
                        : setNameCheck(false);
                    break;
                case 'cvcMinLength':
                    value.length < validations[validation]
                        ? setCvcMinLength(true)
                        : setCvcMinLength(false);
                    break;
                case 'cvcMaxLength':
                    value.length > validations[validation]
                        ? setCvcMaxLength(true)
                        : setCvcMaxLength(false);
                    break;
                case 'minLengthBankCard':
                    value.length < validations[validation]
                        ? setMinLengthBankCard(true)
                        : setMinLengthBankCard(false);
                    break;
                case 'maxLengthBankCard':
                    value.length > validations[validation]
                        ? setMaxLengthBankCard(true)
                        : setMaxLengthBankCard(false);
                    break;
                case 'isEmail':
                    const re =
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    re.test(String(value).toLowerCase())
                        ? setEmailError(false)
                        : setEmailError(true);
            }
        }
    }, [value]);

    useEffect(():void => {
        if (isEmpty || minLengthError || emailError || minLengthBankCard || maxLengthBankCard || cvcMinLength || cvcMaxLength
        || passwordCheck || nameCheck) {
            setInputValid(false);
        } else {
            setInputValid(true);
        }
    }, [isEmpty, minLengthError, emailError, minLengthBankCard, maxLengthBankCard, cvcMinLength, cvcMaxLength, passwordCheck
    || nameCheck]);
    return {
        isEmpty,
        minLengthError,
        emailError,
        inputValid,
        minLengthBankCard,
        maxLengthBankCard,
        cvcMinLength,
        cvcMaxLength,
        passwordCheck,
        nameCheck
    };
};

export default function useInput( value:any, validations:any){
    const [isDirty, setDirty] = useState(false);


    const onBlur = (e:any) => {
        setDirty(true);
    };

    const valid = useValidation(value,validations);
    return {
        onBlur,
        isDirty,
        value,
        ...valid,
    };
};
