import React from 'react';


export const SimpleForm = (props) => {
    return (
        <div>
            <input type="email" value={props.email} onChange={e => props.applyInput(e, 'email', props.idx)} placeholder='Email' />
            <input type="phone" value={props.phone} onChange={e => props.applyInput(e, 'phone', props.idx)} placeholder='Phone Number' />
            {(props.emailProvider && props.phoneCountry) ? <div>{props.emailProvider + props.phoneCountry}</div>:""}
        </div>
        )
}