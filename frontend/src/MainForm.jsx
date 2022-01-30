import React, { useState } from 'react';
import parsePhoneNumber from 'libphonenumber-js'

export const MainForm = ({ isSimpleForm }) => {
    const [inputs, setInputs] = useState([{}]);
    const [responses, setResponses] = useState([]);

    const increase = () => {
        if (isSimpleForm) {
            setInputs([...inputs, {}]);
        }
    }
    const decrease = () => {
        if (isSimpleForm && inputs.length > 1) {
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

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const validatePhone = (phone) => {
        const phoneNumber = parsePhoneNumber(phone)
        if (phoneNumber) {
            return phoneNumber.isValid()
        };
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
            { isSimpleForm && <button onClick={handleAdd}> + </button> }
            { isSimpleForm && <button onClick={handleSubtract}> - </button> }
        </div>
    )
}