import {useEffect, useState} from "react";


function useValidation (value:any,validations:any){
    const [isEmpty, setEmpty] = useState(true);
    const [minLengthError, setMinLengthError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [inputValid, setInputValid] = useState(false);



    useEffect(() => {
        for (const validation in validations) {
            console.log(validations)
            switch (validation) {
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true);
                    break;
                case 'minLength':
                    value.length < validations[validation]
                        ? setMinLengthError(true)
                        : setMinLengthError(false);
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

    useEffect(() => {
        if (isEmpty || minLengthError || emailError) {
            setInputValid(false);
        } else {
            setInputValid(true);
        }
    }, [isEmpty, minLengthError, emailError]);
    return {
        isEmpty,
        minLengthError,
        emailError,
        inputValid,
    };
};

export default function useInput( value:any, validations:any){
    const [isDirty, setDirty] = useState(false);

console.log(value)
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
