import React from "react";

export function QueryComponent() {
    const [state, setState] = React.useState({
        Email: "",
        Phone: ""
    })

    function handleChange(evt) {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }

    return (
        <div>
            <label>
                Enter Valid Email please
                <input
                    type="text"
                    name="Email"
                    value={state.Email}
                    onChange={handleChange}
                />
            </label>
            <label>
                Enter Valid Phone Number Please
                <input
                    type="text"
                    name="Phone"
                    value={state.Phone}
                    onChange={handleChange}
                />
            </label>
        </div>
    );
}