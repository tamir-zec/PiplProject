import React, { useState } from 'react';
import parsePhoneNumber from 'libphonenumber-js'

export const MainForm = ({ isSimpleForm }) => {
    const [inputs, setInputs] = useState([{}]);
    const [responses, setResponses] = useState([]);
    const [submitEnabled, setSubmitEnabled] = useState(false);

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

    const validate = () => {
        let validation = true
        //for email and phone number check valide email and phone
        setSubmitEnabled(validation)
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
            <form>
                {inputs.map(({ email, phone }, index) =>
                    <SimpleForm
                        email={email}
                        phone={phone}
                        setEmail={(newEmail) => setNewEmail(newEmail, index)}
                        setPhone={(newPhone) => setNewPhone(newPhone, index)} />
                )}
            </form>
            { isSimpleForm && <button onClick={increase}> + </button> }
            { isSimpleForm && <button onClick={decrease}> - </button> }
        </div>
    )
}