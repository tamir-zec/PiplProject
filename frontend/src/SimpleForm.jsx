import React, { useState } from 'react';

const validatePhone = (phone) => true;
const validateEmail = (email) => true;

export const SimpleForm = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [submitEnabled, setSubmitEnabled] = useState(false);

    const [emailProvider, setEmailProvider] = useState('');
    const [phoneCountry, setPhoneCountry] = useState('');
    
    const validate = () => setSubmitEnabled(validatePhone(phone) && validateEmail(email));

    const applyNewInput = (e, type) => {
        const setter = type === 'email' ? setEmail : setPhone;
        setter(e.target.value);
        validate();
    }

    const handleSubmit = () => {
        // somehow I need to take mail from the query component I initialized here
        const person_data = { email, phone }
        fetch('/api/simple_request', {
            body: JSON.stringify(person_data),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => handleResponse(res)).then()
    }

    const handleResponse = (res) => {
        const res_out = JSON.parse(res.data);
        setEmailProvider(res_out["email_provider"]);
        setPhoneCountry(res_out["phone_country"]);
    }

    return (
        <div>
            <input type="email" value={email} onChange={e => applyNewInput(e, 'email')} placeholder='Email' />
            <input type="phone" value={phone} onChange={e => applyNewInput(e, 'phone')} placeholder='Phone Number' />
            <button onClick={handleSubmit} disabled={!submitEnabled}>Submit</button>
        </div>
    )
}