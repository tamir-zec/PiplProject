import React, { useState , useEffect} from 'react';
import parsePhoneNumber from 'libphonenumber-js'
import {SimpleForm} from './SimpleForm'

export const MainForm = ({ isSimpleForm }) => {
    const [inputs, setInputs] = useState([{}]);
    const [responses, setResponses] = useState([]);
    const [submitEnabled, setSubmitEnabled] = useState(false);

    useEffect(()=>{
        if(isSimpleForm){
            setInputs([inputs[0]])
        }
    } ,[isSimpleForm])

    const increase = () => setInputs([...inputs, {}]);
    const decrease = () => {
        if (inputs.length > 1) {
            setInputs(inputs.slice(0, -1));
        }
    }

    const setNewEmail = (email, index) => {
        const newInputs = [...inputs];
        newInputs[index].email = email;
        setInputs(newInputs);
    }

    const setNewPhone = (phone, index) => {
        const newInputs = [...inputs];
        newInputs[index].phone = phone;
        setInputs(newInputs);
    }

    const applyNewInput = (e, dataType, index) => {
        if(dataType === "email") {
            setNewEmail(e.target.value, index)
        }
        if(dataType === "phone"){
            setNewPhone(e.target.value, index)
        }
        validate()
    }

    const submitForm = () => {
        let api_url = isSimpleForm ? '/api/simple_request': '/api/advanced_request'
        let data = isSimpleForm ?  inputs[0]:{ "people_list": inputs}
        fetch(api_url, {
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(handleResponse)
    }

    const handleResponse = (res) => {
        setResponses(isSimpleForm? [res.data]: res.data)
    }


    const validate = () => {
        let valid = true
        for(let currInput of inputs){
            valid = validatePhone(currInput.phone)  && validateEmail(currInput.email)
            if(!valid){
                break;
            }
        }
        setSubmitEnabled(valid)
    }

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const validatePhone = (phone) => {
        const phoneNumber = parsePhoneNumber(phone)
        if (phoneNumber) {
            return phoneNumber.isValid()
        }
    }

    return (
        <div>
            <div>
                {inputs.map(({ email, phone }, index) =>
                    <SimpleForm
                        email={email}
                        phone={phone}
                        emailProvider={index >= responses.length ? "":responses[index].emailProvider}
                        phoneCountry={index >= responses.length ? "":responses[index].phoneCountry}
                        idx={index}
                        applyInput={applyNewInput}
                    />
                )}
                <button disabled={!submitEnabled} onClick={submitForm}>submit</button>
            </div>
            { !isSimpleForm && <button onClick={increase}> + </button> }
            { !isSimpleForm && <button onClick={decrease}> - </button> }
        </div>
    )
}