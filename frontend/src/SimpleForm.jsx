import React from 'react';

export const SimpleForm = (props) => {
    const styleAnswer = (emailProvider, PhoneCountry) => {
        return(
            <div>
                <div>Mail Provider: {emailProvider}</div>
                <div>Country by Phone: {PhoneCountry}</div>
            </div>
        )
    }
    return (
        <div>
            <input type="email" value={props.email} onChange={e => props.applyInput(e, 'email', props.idx)} placeholder='Email' />
            <input type="phone" value={props.phone} onChange={e => props.applyInput(e, 'phone', props.idx)} placeholder='Phone Number' />
            {(props.emailProvider!=="" && props.phoneCountry!=="") ? styleAnswer(props.emailProvider,props.phoneCountry):""}
        </div>
        )
}